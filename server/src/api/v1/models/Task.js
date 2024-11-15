import prisma from "../../../config/database";

async function create({
  title,
  description,
  repeatInterval,
  repeatTimes,
  notes = "",
  dueDate,
  user_id,
  category_id,
}) {
  return await prisma.task.create({
    data: {
      title: title,
      description: description,
      notes: notes,
      dueDate: dueDate,
      userId: user_id,
      categoryId: category_id,
      ...(repeatInterval ? { repeatInterval: repeatInterval } : {}),
      ...(repeatTimes ? { repeatTimes: repeatTimes } : {}),
    },
  });
}

async function findById({ id }) {
  return await prisma.task.findUnique({
    where: {
      id,
    },
  });
}

async function findAll({ user_id }) {
  return await prisma.task.findMany({
    where: {
      userId: user_id,
    },
  });
}

async function update({
  id,
  title,
  description,
  repeatInterval,
  repeatTimes,
  notes,
  dueDate,
  category_id,
}) {
  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (repeatInterval !== undefined) updateData.repeatInterval = repeatInterval;
  if (repeatTimes !== undefined) updateData.repeatTimes = repeatTimes;
  if (notes !== undefined) updateData.notes = notes;
  if (dueDate !== undefined) updateData.dueDate = dueDate;
  if (category_id !== undefined) updateData.categoryId = category_id;

  return await prisma.task.update({
    where: {
      id,
    },
    data: updateData,
  });
}

async function remove({ id }) {
  return await prisma.task.delete({
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