import type { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export const USER_ROLES = ["USER", "ADMIN"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export type UserDocument = {
  _id?: ObjectId;
  name: string;
  phone: string;
  phoneNormalized: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    phoneNormalized: {
      type: String,
      required: true,
      unique: true,
      index: true,
      maxlength: 24,
    },
    passwordHash: {
      type: String,
      required: true,
      maxlength: 300,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      required: true,
      default: "USER",
      index: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

userSchema.index({ phoneNormalized: 1 }, { unique: true });
userSchema.index({ role: 1, createdAt: -1 });
userSchema.index({ createdAt: -1 });

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
