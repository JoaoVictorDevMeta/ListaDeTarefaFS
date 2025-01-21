import prisma from "../../../config/database.js";
import config from "../../../config/config.js";

async function doneTaskNoInterval(id) {
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

async function doneTaskInterval(nextDate, nextInterval, repeatTimes, id) {
    return await prisma.task.update({
        where: {
            id,
        },
        data: {
            nextDate: nextDate,
            nextInterval: nextInterval,
            repeatTimes: repeatTimes,
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
    doneTaskNoInterval,
    doneTaskInterval,
    undoneTaskNoInterval,
    readAllMODE,
    readAllRepeat,
};
