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


// async function update({ userId, path }) {
//   const newImage = await prisma.image.update({
//     where: {
//       user: {
//         id: userId,
//       }
//     },
//     data: {
//       path,
//       user: {
//         connect: {
//           id: userId,
//         },
//       },
//     },
//   });

//   return newImage;
// }

async function update({ userId, path }) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      image: true,
    },
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const updatedImage = await prisma.image.update({
    where: {
      id: user.image.id, // Acesso ao ID da imagem através da relação com o usuário
    },
    data: {
      path,
    },
  });

  return updatedImage;
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