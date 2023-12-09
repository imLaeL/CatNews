import API from '../../../login/js/lib/auth.js';

function getClinics(clinic, address, medic) {
  return `
        <div class="clinic" id="clinic-${clinic.id}">
            <img id="clinic_image" src="" width="400px" height="300px">
            <p class="clinic-name">${clinic.name}</p>
            <p class="clinic-name horario">Aberto das ${clinic.horario_aberto} as ${clinic.horario_fechado}</p>
            <p class="clinic-name CEP">CEP: ${address.CEP}</p>
            <p class="clinic-name rua">Rua: ${address.rua}</p>
            <p class="clinic-name cidade">Cidade: ${address.cidade}</p>  
            <p class="clinic-name medico">Médico reponsável: ${medic.name_medic}</p>      
            <div class="icon-trash" id="lixeira" style="justify-content: center; flex-wrap: wrap; display: flex; cursor: pointer;">
                <span
                    class="iconify"
                    data-icon="solar:trash-bin-minimalistic-broken"
                    style="font-size: 2rem"
                >
                </span>
            </div>

        </div>

       
    `;
}

function addClinics(clinic, address, medic) {
 
  if (clinic && address && medic) {

    const submitedClinics = document.querySelector('#submited-clinics');
  
    const clinicsView = getClinics(clinic, address, medic);
  
    submitedClinics.insertAdjacentHTML('beforeend', clinicsView);
  
    const submited_clinic_div = document.querySelector(`#clinic-${clinic.id}`);
  
    const lixeiraIcon = submited_clinic_div.querySelector('.icon-trash');
  
    lixeiraIcon.onclick = () => {
      try {
        fetch(`/clinicas-submetidas/${clinic.id}`, {
          method: 'delete',
          headers: {
            Authorization: `Bearer ${API.getToken()}`,
          },
        });
  
        submited_clinic_div.remove();
      } catch (error) {
        console.error('Erro ao deletar a clínica', error);
      }
    };
  }
}
 

async function loadClinics() {
  try {
    const response_clinics = await fetch('/clinicas-submetidas', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${API.getToken()}`,
      },
    });

    const response_address = await fetch('/enderecos', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${API.getToken()}`,
      },
    });

    const response_medic = await fetch('/medicos', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${API.getToken()}`,
      },
    });

    if (response_clinics.ok && response_address.ok && response_medic.ok) {
      const clinics = await response_clinics.json();
      const addresses = await response_address.json();
      const medics = await response_medic.json();

      for (let i = 0; i < clinics.length; i++) {
        const clinic = clinics[i];
        const address = addresses[i];
        const medic = medics[i];

        addClinics(clinic, address, medic);
      }
    } else {
      console.error(
        'Falha ao realizar fetch na rota das clínicas:',
        response.statusText
      );
    }
  } catch (error) {
    console.error('Erro no processo de fetch das clínicas:', error);
  }
}

function loadFormSubmit() {
  const form = document.querySelector('form');

  form.onsubmit = async (event) => {
    event.preventDefault();

    // const formData = new FormData(form);

    // const name = formData.name;

    // const horario_aberto = formData.horario_aberto;

    // const horario_fechado = formData.horario_fechado;

    // const CEP = formData.CEP;

    // const name_medic = formData.medico;

    // const especialidade = formData.especialidade;

    const name = document.querySelector('#name').value;

    const horario_aberto = document.querySelector('#horario_aberto').value;

    const horario_fechado = document.querySelector('#horario_fechado').value;

    const CEP = document.querySelector('#CEP').value;

    const name_medic = document.querySelector('#medico').value;

    const especialidade = document.querySelector('#especialidade').value;

    const clinic = { name, horario_aberto, horario_fechado };

    const address = { CEP };

    const medic = { name_medic, especialidade };

    const data = { clinic, address, medic };

    try {
      const response = await fetch('/clinicas-submetidas', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API.getToken()}`,
        },
      });

      if (response.ok) {
        const {
          clinic: newClinic,
          address: newAddress,
          medic: newMedic,
        } = await response.json();

        addClinics(newClinic, newAddress, newMedic);
        
        const formData = new FormData();
        const imageFile = document.getElementById('image').files[0];
        formData.append('image', imageFile);

        try {
          const imageResponse = await fetch('/clinics/image', {
            method: 'post',
            body: formData,
            headers: {
              Authorization: `Bearer ${API.getToken()}`,
            },
          });

          if (imageResponse.ok) {
            console.log('Imagem enviada com sucesso!');
          } else {
            console.error('Falha ao enviar a imagem.');
          }
        } catch (error) {
          console.error('Erro ao enviar a imagem:', error);
        }

        
        form.reset();
        document.querySelector('.addclinicbutton').click();


      } else {
        console.error('Falha ao adicionar clínica:', response.statusText);
        
        const div_alert = `<div id="div_alert" class="alert alert-danger" role="alert">Dados inválidos para o cadastro</div`;
        const div_message_alert = document.querySelector("#div_message_alert");
        div_message_alert.insertAdjacentHTML('beforeend', div_alert);

      }
    } catch (error) {
      console.error('Erro ao adicionar clínica:', error.message);
    }

    try {
      const response = await fetch('/clinics/image', {
        method: 'post',
        body: image,
        headers: {
          Authorization: `Bearer ${API.getToken()}`,
        },
    })
  } catch (error) {
    console.error('Erro ao enviar imagem: ', error.message)
  }
}
}

window.signout = API.signout;

loadClinics();

if (API.isAuthenticated()) {

  loadFormSubmit();
} else {
  document.querySelector('#botão').style.display = 'none';
}
