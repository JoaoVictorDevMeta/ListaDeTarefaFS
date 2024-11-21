import express from "express";
import User from "../models/User";
import 

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Admin route" });
});

export default router;