import prisma from "../../../config/database.js";
import config from "../../../config/config.js";

async function completeTaskNoInterval(id) {
    return await prisma.task.update({
        where: {
            id,
        },
        data: {
            status: true,
            completedAt: config.formatDateTime(new Date()),
        },
    });
}

async function completeTaskWithInterval({
  id,
  nextDate,
  nextInterval,
  days,
  repeatTimes,
}) {
  if (repeatTimes === 0) {
      // Last complete
      return await prisma.task.update({
          where: {
              id,
          },
          data: {
              status: true,
              completedAt: config.formatDateTime(new Date()),
          },
      });
  }

  //this part is more about converting data 
  const weekDays = days.split(" ").map(Number); // Convert to array of numbers
  const currentDayIndex = weekDays.indexOf(nextInterval);
  const nextDayIndex = (currentDayIndex + 1) % weekDays.length;
  const nextDay = weekDays[nextDayIndex];

  const currentDate = new Date(nextDate);
  const currentDayOfWeek = currentDate.getDay() + 1; // getDay() returns 0-6, add 1 to match 1-7

  //here the logic goes
  let daysToAdd;
  if (nextDay > currentDayOfWeek) {
      daysToAdd = nextDay - currentDayOfWeek;
  } else {
      daysToAdd = (7 - currentDayOfWeek) + nextDay;
  }

  currentDate.setDate(currentDate.getDate() + daysToAdd);

  const newRepeatTimes = repeatTimes ? repeatTimes - 1 : repeatTimes;

  return await prisma.task.update({
      where: {
          id,
      },
      data: {
          nextDate: currentDate,
          nextInterval: nextDay,
          repeatTimes: newRepeatTimes,
          completedAt: config.formatDateTime(new Date()),
      },
  });
}

async function undoneTaskNoInterval(id) {
    return await prisma.task.update({
        where: {
            id,
        },
        data: {
            status: false,
        },
    });
}

async function undoneTaskWithInterval({
    id,
    dueDate,
    repeatInterval,
    repeatTimes,
}) {
    const newDueDate = new Date(dueDate);
    newDueDate.setDate(newDueDate.getDate() - repeatInterval * 86400);

    const newQuant = repeatTimes ? repeatTimes + 1 : repeatTimes;

    return await prisma.task.update({
        where: {
            id,
        },
        data: {
            dueDate: config.formatDateTime(newDueDate),
            repeatTimes: newQuant,
        },
    });
}

async function readAllMODE(state, user_id) {
    const status = state === "done" ? true : false;
    return await prisma.task.findMany({
        where: {
            userId: user_id,
            status: status,
        },
    });
}

async function readAllRepeat(user_id) {
    return await prisma.task.findMany({
        where: {
            userId: user_id,
        },
    });
}

export default {
    completeTaskNoInterval,
    completeTaskWithInterval,
    undoneTaskNoInterval,
    undoneTaskWithInterval,
    readAllMODE,
    readAllRepeat,
};
