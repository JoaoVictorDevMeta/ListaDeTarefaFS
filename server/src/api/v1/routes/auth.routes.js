import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Auth route" });
});
router.get("/validate-auth", isAuthenticated, (req, res) => {
  res.json({auth: true, message: "Token is OK"})
})
router.post("/login", login)
router.post("/register", register)

export default router;