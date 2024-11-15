import prisma from "../../../config/database";
import config from "../../../config/config";

async function completeTaskNoInterval({ id }) {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      status: True,
      completedAt: config.formatDateTime(new Date()),
    },
  });
}

async function completeTaskWithInterval({ id }) {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  //following the logic of the repeatInterval
  //more on schema.prisma
  const newDueDate = new Date(task.dueDate);
  newDueDate.setDate(newDueDate.getDate() + task.repeatInterval * 86400);

  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      dueDate: config.formatDateTime(newDueDate),
      //this means the last completed date
      completedAt: config.formatDateTime(new Date()),
    },
  });
}

export default {
  completeTaskNoInterval,
  completeTaskWithInterval,
};
