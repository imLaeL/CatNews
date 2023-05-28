import SubmitedClinics from '../model/submited_clinics.js';
import Address from '../model/address.js';
import { submited_clinics, clinic_address } from './data.js';

async function seed () {
  try {
    const clinics = submited_clinics;
    try {
     for (const clinic of clinics) {
        await SubmitedClinics.create(clinic);
      }
    } catch (error) {
      console.error('\nErro ao criar as clínicas submetidas:\n', error)
    }

    try {
      for (const address of clinic_address) {
        await Address.create(address);
      }
    } catch (error) {
      console.error('\nErro ao criar os endereços:\n', error)
    }

    console.log('\nSementes inseridas com sucesso,')
  } catch (error) {
    console.error('\nErro ao inserir as sementes')
  }
};

seed();