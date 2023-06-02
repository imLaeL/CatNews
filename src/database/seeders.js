import SubmitedClinics from '../model/submited_clinics.js';
import Address from '../model/address.js';
import { submited_clinics, clinic_address } from './data.js';

async function seed() {
  try {
    const clinics = submited_clinics;

    for (const clinic of clinics) {
      await SubmitedClinics.create_clinic(clinic);
    }

    for (const address of clinic_address) {
      await Address.create_address(address);
    }

    console.log('\nSementes inseridas com sucesso')
  } catch (error) {
    console.error('\nErro ao inserir as sementes ;(')
  }
};

seed();