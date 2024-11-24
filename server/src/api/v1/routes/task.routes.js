import express from "express";
//models
import Task from "../models/Task.js";
import TaskServices from "../services/Task.services.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Task route" });
});

//this part is consult route ---------------------
//just the user or the admin can view all the tasks
router.get("/all", async (req, res, next) => {
  try {
    const allTasks = await Task.findAll(req.userId);
    res.json(allTasks);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/select/:taskId", async (req, res, next) => {
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
});

router.get("/todo", async (req, res, next) => {
  try {
    const allTasks = await TaskServices.readAllMODE("todo", req.userId);
    res.json(allTasks);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/done", async (req, res, next) => {
  try {
    const allTasks = await TaskServices.readAllMODE("done", req.userId);
    res.json(allTasks);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/repeatable", async (req, res, next) => {
  try {
    const allTasks = await TaskServices.readAllRepeat(req.userId);
    res.json(allTasks);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// this part is writing route -------------------

router.patch("/conclue/:taskId", async (req, res, next) => {
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

      return res.status(200).json({ message: "Task concluída com sucesso", task });
    }
    
    task = await TaskServices.completeTaskNoInterval(taskId);
    return res.status(200).json({ message: "Task concluída com sucesso", task });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
