import prisma from "../../../config/database.js";

async function create({ perfil, email, name, password, image_url = "" }) {
  return await prisma.user.create({
    data: {
      PerfilId: perfil,
      email,
      name,
      password,
      image_url,
    },
  });
}

async function findByEmail( email ) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function findById( id ) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function findAll() {
  return await prisma.user.findMany();
}

async function update({ id, email, name, password, image_url }) {
  const updateData = {};

  if (email !== undefined) updateData.email = email;
  if (name !== undefined) updateData.name = name;
  if (password !== undefined) updateData.password = password;
  if (image_url !== undefined) updateData.image_url = image_url;

  return await prisma.user.update({
    where: {
      id,
    },
    data: updateData,
  });
}

async function remove( id ) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}

export default {
  create,
  findByEmail,
  findById,
  findAll,
  update,
  remove,
};
