function getClinics(clinic, address, medic) {
    return `
        <div class="clinic" id="clinic-${clinic.id}">
            <img src="${clinic.imageurl}" width="400px" height="300px">
            <p class="clinic-name">${clinic.name}</p>
            <p class="clinic-name horario">Aberto das ${clinic.horario_aberto} as ${clinic.horario_fechado}</p>
            <p class="clinic-name CEP">CEP: ${address.CEP}</p>
            <p class="clinic-name rua">Rua: ${address.rua}</p>
            <p class="clinic-name numero">Número: ${address.numero}</p>
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
    const submitedClinics = document.querySelector('#submited-clinics');

    const clinicsView = getClinics(clinic, address, medic);

    submitedClinics.insertAdjacentHTML('beforeend', clinicsView);
    
    const submited_clinic_div = document.querySelector(`#clinic-${clinic.id}`);

    const lixeiraIcon = submited_clinic_div.querySelector('.icon-trash');

    lixeiraIcon.onclick = async () =>  {
        const id = parseInt(clinic.id);
        try { 
           fetch(`/clinicas-submetidas/${id}`, {
                method: 'delete',
            }).then((response) => {
                if (response.ok) {
                    submited_clinic_div.remove();
                } else {
                    throw new Error('Falha ao excluir clínica');
                }
            }).catch((error) => {
                console.error(error);
            });

        } catch (error) {
            console.error('Erro ao deletar a clínica', error);
        }
    };
}

async function loadClinics() {
    try {
        const response_clinics = await fetch('/clinicas-submetidas');
        const response_address = await fetch('/enderecos');
        const response_medic = await fetch('/medicos')
        
        if (response_clinics.ok && response_address.ok && response_medic.ok) {
            const clinics = await response_clinics.json();
            const addresses = await response_address.json();
            const medics = await response_medic.json()

            for (let i = 0; i < clinics.length; i ++) {
                const clinic = clinics[i];
                const address = addresses[i];
                const medic = medics[i];

                addClinics(clinic, address, medic);
            }
        
        } else {
            console.error('Falha ao realizar fetch na rota das clínicas:', response.statusText);
        }
    
    } catch (error) {
        console.error('Erro no processo de fetch das clínicas:', error);
    }
  
    
}

function loadFormSubmit() {
    const form = document.querySelector('form');

    form.onsubmit = async (event) => {
        event.preventDefault();

        const name = document.querySelector('#name').value;

        const imageurl = document.querySelector('#img').value;

        const horario_aberto= document.querySelector('#horario_aberto').value;

        const horario_fechado = document.querySelector('#horario_fechado').value;

        const CEP = document.querySelector('#CEP').value;

        const rua = document.querySelector('#rua').value;

        const numero = document.querySelector('#numero').value;

        const cidade = document.querySelector('#cidade').value;

        const name_medic = document.querySelector('#medico').value;

        const especialidade = document.querySelector('#especialidade').value;

        const clinic = { name, imageurl, horario_aberto, horario_fechado };

        const address = { CEP, rua, numero, cidade };

        const medic = { name_medic, especialidade }

        const data = { clinic, address, medic }

        try {

            const response = await fetch('/clinicas-submetidas', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json', 
                },
            });

            if (response.ok) {
                const { clinic: newClinic, address: newAddress, medic: newMedic } = await response.json();
                addClinics(newClinic, newAddress, newMedic);
                form.reset();
                document.querySelector('.addclinicbutton').click();
            } else {
                console,error('Falha ao adicionar clínica:', response.statusText);
            }
        
        } catch (error) {
            console.error('Erro ao adicionar clínica:', error.message);
        }
  
      
    };
}

loadClinics();

loadFormSubmit();