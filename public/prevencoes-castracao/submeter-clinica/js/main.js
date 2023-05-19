function getClinics(clinic) {
    return `
        <div class="clinic" id="clinic-${clinic.id}">
            <img src="${clinic.imageurl}" width="400px" height="300px">
            <p class="clinic-name">${clinic.name}</p>
            <p class="clinic-name city">${clinic.city}</p>
            
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

function addClinics(clinic) {
    const submitedClinics = document.querySelector('#submited-clinics');

    const clinicsView = getClinics(clinic);

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
        const response = await fetch('/clinicas-submetidas');
        
        if (response.ok) {
            const clinics = await response.json();
        
            for (const clinic of clinics) {
                addClinics(clinic);
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

        const city = document.querySelector('#city').value;

        const clinic = { name, imageurl, city };

        try {

            const response = await fetch('/clinicas-submetidas', {
                method: 'post',
                body: JSON.stringify(clinic),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const newClinic = await response.json();
                addClinics(newClinic);
                form.reset();
                document.querySelector('.addclinicbutton').click();
            } else {
                console,error('Falha ao adicionar clínica:', response.statusText);
            }
        
        } catch (error) {
            console.error('Erro ao adicionar clínica:', error);
        }
  
      
    };
}



loadClinics();

loadFormSubmit();