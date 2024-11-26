import prisma from "../../../config/database.js";

async function findById(id) {
  return await prisma.task.findUnique({
    where: {
      id,
    },
  });
}

async function findAll(user_id) {
  return await prisma.task.findMany({
    where: {
      userId: user_id,
    },
  });
}

async function update({data, id}) {
  return await prisma.task.update({
    where: {
      id,
    },
    data,
  });
}

async function create({data, user_id}) {
  return await prisma.task.create({
    data: {
      ...data,
      userId: user_id,
    },
  });
}

async function remove( id ) {
  return await prisma.task.delete({
    where: {
      id,
    },
  });
}

export default {
  findById,
  create,
  findAll,
  update,
  remove,
};
