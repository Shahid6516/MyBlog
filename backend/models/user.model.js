import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["reader", "author", "admin"],
      default: "reader",
    },
    profilePic: String,
    bio: String,
    bookmarks: [ObjectId], // post ids
  },
  { timestamps: true }
);

export default UserSchema = mongoose.model("User", UserSchema);
