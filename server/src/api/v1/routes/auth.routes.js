import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Auth route" });
});

export default router;