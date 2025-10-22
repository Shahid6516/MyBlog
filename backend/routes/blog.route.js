import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Blog route working!");
});

export default router;
