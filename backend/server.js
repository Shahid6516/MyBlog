import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/blog.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Log Cloudinary environment variables
console.log("Cloudinary ENV:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing",
});

// ✅ Routes
// app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// ✅ Global error handler (must come AFTER routes)
app.use((err, req, res, next) => {
  console.error("💥 GLOBAL ERROR CAUGHT:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: err.stack,
  });
});

// ✅ Server + Database connection
app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`🚀 Server is running on PORT: ${process.env.PORT}`);
});
