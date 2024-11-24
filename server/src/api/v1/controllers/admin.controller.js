import User from "../models/User.js";
import Task from "../models/Task.js";

async function getUsers(req, res, next) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getTasksFromUser(req, res, next) {
  try {
    const userId = Number(req.params.id);
    if (!userId) return res.status(400).json({ message: "Id inválido" });

    const tasks = await Task.findAll(userId);
    if (!tasks || tasks.length === 0)
      return res.status(404).json({
        message:
          "Tasks não encontradas, esse usuário não existe ou não tem tasks criadas",
      });

    res.json(tasks);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    const taskId = Number(req.params.id);
    if (!taskId) return res.status(400).json({ message: "Id inválido" });

    await Task.remove(taskId);
    res.status(204).json({ message: "Task deletada com sucesso" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export default { getUsers, getTasksFromUser, deleteTask };