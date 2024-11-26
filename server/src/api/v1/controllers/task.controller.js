import Task from "../models/Task.js";
import Category from "../models/Category.js";
import TaskServices from "../services/Task.services.js";
import {
    calculateRepeatTimes,
    getNextInterval,
} from "../helpers/calcInterval.js";

async function AllTasksCurrentUser(req, res, next) {
    try {
        const allTasks = await Task.findAll(req.userId);
        res.json(allTasks);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function GetTaskById(req, res, next) {
    const taskId = Number(req.params.taskId);
    try {
        const task = await Task.findById(taskId);
        if (!task || task.userId !== req.userId) {
            return res.status(404).json({ message: "Nenhuma Task encontrada" });
        }
        res.json(task);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function AllTasksTodo(req, res, next) {
    try {
        const allTasks = await TaskServices.readAllMODE("todo", req.userId);
        res.json(allTasks);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function AllTasksDone(req, res, next) {
    try {
        const allTasks = await TaskServices.readAllMODE("done", req.userId);
        res.json(allTasks);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function AllTasksRepeat(req, res, next) {
    try {
        const allTasks = await TaskServices.readAllRepeat(req.userId);
        res.json(allTasks);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function ConclueTask(req, res, next) {
    const taskId = Number(req.params.taskId);

    try {
        const existTask = await Task.findById(taskId);
        if (!existTask || existTask?.userId !== req.userId) {
            return res.status(404).json({ message: "Nenhuma Task encontrada" });
        }

        if (existTask.status) {
            return res.status(403).json({ message: "Task ja concluída" });
        }

        let task;
        if (existTask.days) {
            task = await TaskServices.completeTaskWithInterval({
                id: taskId,
                nextDate: existTask.nextDate,
                nextInterval: existTask.nextInterval,
                days: existTask.days,
                repeatTimes: existTask.repeatTimes,
            });

            return res
                .status(200)
                .json({ message: "Task concluída com sucesso", task });
        }

        task = await TaskServices.completeTaskNoInterval(taskId);
        return res
            .status(200)
            .json({ message: "Task concluída com sucesso", task });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function CreateTask(req, res, next) {
    let data;
    let repeatTimes = null;

    try {
        console.log(req.body);
        const categoryId = await Category.findByName({
            name: req.body.category,
            user_id: req.userId,
        });

        if (!categoryId) {
            return res.status(400).json({ message: "Categoria inválida" });
        }

        if (req.body.days) {
            if (req.body.maxDate !== "noLimit") {
                repeatTimes = calculateRepeatTimes(
                    req.body.todayDate,
                    req.body.maxDate,
                    req.body.days
                );
            }

            if (repeatTimes === 0) {
                return res
                    .status(400)
                    .json({ message: "Datas de início ou término inválidas" });
            }

            const nextInterval = getNextInterval(
                req.body.taskDate,
                req.body.days
            );

            data = {
                title: req.body.title,
                description: req.body.description,
                categoryId: categoryId.id,
                status: false,
                days: req.body.days,
                nextDate: req.body.todayDate,
                createdAt: req.body.todayDate,
                nextInterval,
                repeatTimes,
            };
        }else {
            data = {
                title: req.body.title,
                description: req.body.description,
                categoryId: categoryId.id,
                status: false,
                days: null,
                nextDate: req.body.todayDate,
                createdAt: req.body.todayDate,
                nextInterval: null,
                repeatTimes: null,
            };
        }

        const task = await Task.create({ data, user_id: req.userId });
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export default {
    AllTasksCurrentUser,
    GetTaskById,
    AllTasksTodo,
    AllTasksDone,
    AllTasksRepeat,
    ConclueTask,
    CreateTask,
};
