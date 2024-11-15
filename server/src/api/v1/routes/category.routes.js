import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Category route" });
});

export default router;