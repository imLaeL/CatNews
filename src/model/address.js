import prisma from '../database/database.js';

async function create(address) {
  const newAddress = await prisma.address.create({
    data: address,
  });

  return newAddress;
}

async function readAll() {
  const addresses = await prisma.address.findMany();

  return addresses;
}

async function read(id) {
  const address = await prisma.address.findUnique({
    where: {
      id,
    },
  });

  return address;
}

export default { create, readAll, read };