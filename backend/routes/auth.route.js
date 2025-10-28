import express from "express";
import { loginUser } from "../controllers/user.controller.js"; // adjust if needed

const router = express.Router();

// Routes
router.post("/login", loginUser);

export default router; // ✅ this is required
