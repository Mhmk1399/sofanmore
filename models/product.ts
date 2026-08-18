import type { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export type ProductDocument = {
  _id?: ObjectId;
  productCode: number;
  name: string;
  imageUrl: string;
  imageStorageKey?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

const productSchema = new Schema(
  {
    productCode: {
      type: Number,
      required: true,
      min: 1000,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 600,
    },
    imageStorageKey: {
      type: String,
      trim: true,
      maxlength: 600,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1400,
    },
  },
  {
    collection: "products",
    timestamps: true,
  },
);

productSchema.index({ productCode: 1 }, { unique: true, sparse: true });
productSchema.index({ productCode: -1, createdAt: -1 });
productSchema.index({ name: 1, createdAt: -1 });
productSchema.index({ createdAt: -1 });

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
