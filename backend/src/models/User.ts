import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  fullName: string
  email: string
  mobile: string
  password: string
  role: "user" | "admin"
  createdAt: Date
}

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const User = mongoose.model<IUser>("User", userSchema)
