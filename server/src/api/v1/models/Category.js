import prisma from "../../../config/database.js";

async function create({ name, user_id, color = "#00000" }) {
  return await prisma.category.create({
    data: {
      name: name,
      userId: user_id,
      color: color,
    },
  });
}

async function findById({ id }) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}

async function findAll({ user_id }) {
  return await prisma.category.findMany({
    where: {
      userId: user_id,
    },
  });
}

async function update({ id, name, color }) {
  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (color !== undefined) updateData.color = color;

  return await prisma.category.update({
    where: {
      id,
    },
    data: updateData,
  });
}

async function remove({ id }) {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
}

export default {
  create,
  findById,
  findAll,
  update,
  remove,
};