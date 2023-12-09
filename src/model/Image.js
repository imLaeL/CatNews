import prisma from '../database/database.js';

async function create_image_user({ userId, path }) {
  try {

    const newImage = await prisma.image.create({
      data: {
        path,
        user: {
          connect: {
             id: userId
           }
        }
      },
  });


    return newImage;
  } catch (error) {
    console.log(error);
  }
}


async function update({ userId, path }) {
  const newImage = await prisma.image.update({
    where: {
      userId,
    },
    data: {
      path,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return newImage;
}

async function create_image_clinic({ id_clinic, path }) {
  try {

    const newImage = await prisma.image.create({
      data: {
        path,
        clinic: {
          connect: {
            id: id_clinic
          }
        }
      },
    });


    return newImage;
  } catch (error) {
    console.log(error);
  }
}

export default { create_image_user, create_image_clinic, update };