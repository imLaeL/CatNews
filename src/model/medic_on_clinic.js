import prisma from '../database/database.js';

async function create(medic_id, clinic_id) {
    const newMedicOnClinic = await prisma.medicOnClinic.create({
        data: {
            medic_id,
            clinic_id
        }
    });

    return newMedicOnClinic;
}

async function readAll() {
    const medicsOnClinics = await prisma.medicOnClinic.findMany();

    return medicsOnClinics;
}

async function read(medic_id, clinic_id) {
    const MedicOnClinic = await prisma.medicOnClinic.findUnique({
        where: {
            medic_clinic_id: {
                medic_id,
                clinic_id
            },
        },
    });

    return MedicOnClinic;
}

export default { create, readAll, read };