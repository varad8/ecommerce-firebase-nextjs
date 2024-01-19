import { model, models, Schema } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  emailVerified: { type: String },
});

export const User = models?.User || model("User", UserSchema);
