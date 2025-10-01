import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cors from "cors"

// const router = express.Router();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());




app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`Server is runing on PORT:${process.env.PORT}`);
});
