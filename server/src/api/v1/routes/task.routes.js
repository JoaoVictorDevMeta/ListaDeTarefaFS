import express from "express";
import taskController from "../controllers/task.controller.js";
import { validate } from "../middlewares/validate.js";
import { taskSchema } from "../validations/taskSchema.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Task route" });
});

//this part is consult route ---------------------
//just the user or the admin can view all the tasks
router.get("/all", taskController.AllTasksCurrentUser);

router.get("/select/:taskId", taskController.GetTaskById);

router.get("/todo", taskController.AllTasksTodo);

router.get("/done", taskController.AllTasksDone);

router.get("/repeatable", taskController.AllTasksRepeat);

// this part is writing route -------------------

router.patch("/conclue/:taskId", taskController.ConclueTask);

router.post("/create", validate(taskSchema), taskController.CreateTask);

export default router;
