import prisma from "../../../config/database.js";
import config from "../../../config/config.js";

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
  //notice the conditional statement
  //in BD, if the repeatTimes is 0 or null, does not enter the logic of decreasing
  const newQuant = task.repeatTimes ? task.repeatTimes -1 : task.repeatTimes

  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      dueDate: config.formatDateTime(newDueDate),
      repeatTimes: newQuant,
      //this means the last completed date
      completedAt: config.formatDateTime(new Date()),
    },
  });
}

async function readAllMODE(state, user_id) {
  const status = state === "done" ? true : false
  return await prisma.task.findMany({
    where: {
      userId: user_id,
      status: status
    }
  })
}

async function readAllRepeat(user_id) {
  return await prisma.task.findMany({
    where: {
      userId: user_id,
    }
  })
}

export default {
  completeTaskNoInterval,
  completeTaskWithInterval,
  readAllMODE,
  readAllRepeat,
};
