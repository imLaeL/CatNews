function getClinics(clinic) {

    return `<div class=clinicas-joao-pessoa">
                <div id="${clinic.name}" class="clinicas">
                    <p class="texto-na-imagem">${clinic.titulo}</p>
                </div>
            </div>
            
            ${getClinicsDescription(clinic.description)}

            `;          
}

function getClinicsDescription(clinic_description) {

    return `<div class="descricao-clinicas">
                <div class="descricao-clinica">
                    <p class="endereço">${clinic_description.endereço}<br></p>
                    <p class="horario"> Horário: ${clinic_description.horario}<br> </p>
                    <p class="telefone"> Telefone: ${clinic_description.telefone}</p>
                </div>
            </div>`;
}

const response = await fetch('./data/clinicas.json');
const data = await response.json();

let clinics_list = '';

for (const clinic of data.clinics) {
    clinics_list += getClinics(clinic);
}


clinics_list;

document.querySelector('section#clinicas').innerHTML = clinics_list;