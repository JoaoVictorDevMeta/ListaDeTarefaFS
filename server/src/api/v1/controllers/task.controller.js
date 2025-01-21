import Task from "../models/Task.js";
import Category from "../models/Category.js";
import TaskServices from "../services/Task.services.js";
import TaskDateCalc from "../helpers/taskDateCalc.js";

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
        //task existance 
        if (!existTask || existTask?.userId !== req.userId) {
            return res.status(404).json({ message: "Nenhuma Task encontrada" });
        }
        //task status inst conclued 
        if (existTask.status) {
            return res.status(403).json({ message: "Task ja concluída" });
        }

        if(!existTask.days || existTask.repeatTimes === 1){
            const task = await TaskServices.doneTaskNoInterval(taskId);
            return res
                .status(200)
                .json({ message: "Task concluída com sucesso", task });
        }

        const taskDateCalc = new TaskDateCalc(existTask.nextDate, existTask.days);
        const nextInterval = taskDateCalc.getInterval();
        const nextDate = taskDateCalc.getNextDate(nextInterval);
        const repeatTimes = existTask.repeatTimes //in case of infite repeat
            ? existTask.repeatTimes - 1 
            : existTask.repeatTimes;

        const task = await TaskServices.doneTaskInterval(nextDate, nextInterval, repeatTimes, taskId);
        return res.status(200).json({ message: "Task concluída com sucesso", task });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function CreateTask(req, res, next) {
    //let data;
    let repeatTimes = null;
    let nextInterval = null;
    let nextDate = req.body.maxDate;
    const taskDateCalc = new TaskDateCalc(req.body.todayDate, req.body.days);

    try {
        if (!taskDateCalc.isValidDate(req.body.maxDate)) {
            return res.status(400).json({ message: "Datas inválidas" });
        }

        if (req.body.repeat){
            if (!req.body.days){
                return res.status(400).json({ message: "Dias inválidos" });
            }

            // dynamic repeat part
            repeatTimes = taskDateCalc.calculateRepeatTimes(req.body.maxDate);
            nextInterval = taskDateCalc.getInterval();
            nextDate = taskDateCalc.getNextDate(nextInterval)
        }

        const category = await Category.findByName({
            name: req.body.category,
            user_id: req.userId,
        });
        if (!category.id) {
            return res.status(400).json({ message: "Categoria inválida" });
        }

        const data = {
            status: false,
            title: req.body.title,
            description: req.body.description,
            createdAt: req.body.todayDate,
            updatedAt: req.body.todayDate,
            days: req.body.days,
            categoryId: category.id,
            // ---- the dynamic part ----
            nextDate: nextDate,
            nextInterval: nextInterval,
            repeatTimes: repeatTimes,
        };

        const task = await Task.create({ data, user_id: req.userId });
        res.status(200).json(task);
        //res.send(data);
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
