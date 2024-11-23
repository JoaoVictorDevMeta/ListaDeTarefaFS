import express from "express";
import User from "../models/User.js";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Admin route" });
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/tasks/:id", async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    if(!userId) return res.status(400).json({ message: "Id inválido" });

    const tasks = await Task.findAll(userId);
    if (!tasks || tasks.length === 0)
      return res
        .status(404)
        .json({
          message:
            "Tasks não encontradas, esse usuário não existe ou não tem tasks criadas",
        });

    res.json(tasks);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/delete/task/:id", async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    if(!taskId) return res.status(400).json({ message: "Id inválido" });
    
    await Task.remove(taskId);
    res.status(204).json({ message: "Task deletada com sucesso" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
