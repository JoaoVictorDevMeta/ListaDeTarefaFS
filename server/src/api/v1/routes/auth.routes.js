import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

router.get("/", (req, res) => {
  res.json({ message: "Auth route" });
});
router.get("/validate-auth", isAuthenticated,  async(req, res) => {
  await sleep(2000)
  res.json({auth: true, message: "Token is OK"})
})
router.post("/login", login)
router.post("/register", register)

export default router;