import prisma from '../database/database.js';

async function create(data) {
  const newUser = await prisma.user.create({
    data: data,
  });

  return newUser;
}

async function readAll() {
  const users = await prisma.user.findMany();

  return users;
}

async function read(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export default { create, readAll, read };