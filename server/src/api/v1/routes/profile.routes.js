import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Profile route" });
});

export default router;