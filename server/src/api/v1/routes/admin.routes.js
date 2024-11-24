import express from "express";
import adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Admin route" });
});

router.get("/users", adminController.getUsers);

router.get("/tasks/:id", adminController.getTasksFromUser);

router.delete("/delete/task/:id", adminController.deleteTask);

export default router;
