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



// app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);



app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`🚀 Server is running on PORT: ${process.env.PORT}`);
});
