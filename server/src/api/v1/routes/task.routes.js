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
router.get("/all/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  //the way with auth below
  //const userId = req.user.id
  try {
    const allTasks = await Task.findAll(userId);
    res.json(allTasks);
  } catch (error) {
    console.log(error);
  }
});

router.get("/todo/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  try {
    const allTasks = await TaskServices.readAllMODE("todo", userId);
    res.json(allTasks);
  } catch (error) {
    console.log(error);
  }
});

router.get("/done/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  try {
    const allTasks = await TaskServices.readAllMODE("done", userId);
    res.json(allTasks);
  } catch (error) {
    console.log(error);
  }
});

router.get("/repeatable/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  try{
    const allTasks = await TaskServices.readAllRepeat();
    res.json(allTasks)
  }catch(error){
    console.log(error)
  }
})

// this part is writing route -------------------



export default router;
