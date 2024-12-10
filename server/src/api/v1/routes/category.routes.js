import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Category route" });
});

router.get("/all", async (req, res, next) => {
  try{
    const categories = await Category.findAll(req.userId);
    res.json(categories);
  }catch(err){
    console.log(err);
    next(err);
  }
})  

export default router;