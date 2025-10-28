import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.model.js"; // adjust path as needed
import connectDb from "./config/db.js";
dotenv.config();

connectDb()
  .then(async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
      username: "Admin User",
      email: "wdythe@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
