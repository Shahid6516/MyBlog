import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    profilePic: String,
    bio: String,
  },
  { timestamps: true }
);

export default model("User", UserSchema);
