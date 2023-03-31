function getClinics(clinic) {

    return `<div id="${clinic.name}" class="clinicas">
                <p class="texto-na-imagem">${clinic.texto-na-imagem}</p>
            </div>
            
            ${getClinicsDescription(clinic.description)}`;          
}

function getClinicsDescription(clinic_description) {

    return `<div class="descricao-clinica">
                <p class="endereço">${clinic_description.endereço}<br></p>
                <p class="horario"> Horário: ${clinic_description.horario}<br> </p>
                <p class="telefone"> Telefone: ${clinic_description.telefone}</p>
            </div>`;
}

const response = await fetch('./data/clinicas.json');
const data = await response.json();

for (const clinic of data.clinics) {
    clinics_list += getClinics(clinic);
}

clinics_list;

document.querySelector('div.clinicas-joao-pessoa').innerHTML = clinics_list;