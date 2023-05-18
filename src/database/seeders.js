import SubmitedClinics from '../model/submited_clinics.js';
import { submited_clinics } from './data.js';

export default async function seed () {
  try {
    const clinics = submited_clinics;

    for (const clinic of clinics) {
        await SubmitedClinics.create(clinic);
    }
    console.log('Sementes inseridas com sucesso,')
  } catch (error) {
    console.error('Erro ao inserir as sementes:', error)
  }
};

seed();