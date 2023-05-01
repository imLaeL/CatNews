function getClinics(clinic) {
    return `
        <div class="clinic">
            <img src="${clinic.imageurl}" width="400px" height="300px">
            <p class="clinic-name">${clinic.name}</p>
            <p class="clinic-name city">${clinic.city}</p>
        </div>
    `;
}

function addClinics(clinic) {
    const submitedClinics = document.querySelector('#submited-clinics');

    const clinicsView = getClinics(clinic);

    submitedClinics.insertAdjacentHTML('beforeend', clinicsView);       
}

async function loadClinics() {
    
    const response = await fetch('/clinicas-submetidas');
  
    const clinics = await response.json();
  
    for (const clinic of clinics) {
        addClinics(clinic);
    }
}

function loadFormSubmit() {
    const form = document.querySelector('form');
  
    form.onsubmit = async (event) => {
      event.preventDefault();
  
      const name = document.querySelector('#name').value;
  
      const imageurl = document.querySelector('#img').value;

      const city = document.querySelector('#city').value;

 //     const city = document.querySelector('#cidade').value
  
      const clinic = { name, imageurl, city };
  
      const response = await fetch('/clinicas-submetidas', {
        method: 'post',
        body: JSON.stringify(clinic),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const newClinic = await response.json();
  
      addClinics(newClinic);
  
      form.reset();
  
      document.querySelector('.addclinicbutton').click();
    };
}

loadClinics();
loadFormSubmit();