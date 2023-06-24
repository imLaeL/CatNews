import prisma from '../database/database.js';

async function create(medic) {
  const newMedic = await prisma.medic.create({
    data: medic
  });

  return newMedic;
}

async function readAll() {
  const medics = await prisma.medic.findMany();

  return medics;
}

async function read(id) {
  const medic = await prisma.medic.findUnique({
    where: {
      id,
    },
  });

  return medic;
}

export default { create, readAll, read };