import prisma from '../database/database.js';

async function create(data) {
  const newUser = await prisma.user.create({
    data: data,
  });

  return newUser;
}

async function readAll() {
  const users = await prisma.user.findMany({
    include: {
      image: {
        select: {
          path: true,
        },
      },
    },
  });

  return users;
}

async function read(id) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      image: {
        select: {
          path: true,
        },
      },
    },
  });

  return user;
}

async function readByEmail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  });

  return user;
}

async function update(user, id) {
  const newUser = await prisma.user.update({
    data: user,
    where: {
      id,
    },
  });

  return newUser;
}

async function remove(id) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export default { create, readAll, read, readByEmail, remove, update, };