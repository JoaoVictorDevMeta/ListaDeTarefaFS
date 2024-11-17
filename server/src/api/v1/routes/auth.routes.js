import express from "express";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Auth route" });
});
//need validation --------
router.post("/login", login)

export default router;