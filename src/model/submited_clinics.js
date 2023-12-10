import prisma from '../database/database.js';

async function create(clinic) {
    const newClinic = await prisma.clinic.create({
        data: clinic
    })

    return newClinic;
}

async function readAll() {
    const clinics = await prisma.clinic.findMany()

    return clinics;

}

async function read(id) {
    const clinic = await prisma.clinic.findUnique({
        where: {
            id: id,
        }
    })

    return clinic;
}

async function update(clinic, id) {
    const updatedClinic = await prisma.clinic.update({
        where: {
            id,
        },
        data: clinic
    });

    return updatedClinic;
}

async function remove(id) {
    const removedClinic = await prisma.clinic.delete({
        where: {
            id,
        },
    });

    return removedClinic;
}

export default {
    create,
    readAll,
    read,
    update,
    remove,
};