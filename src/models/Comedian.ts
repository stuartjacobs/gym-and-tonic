import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComedian extends Document {
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  banner: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ComedianSchema = new Schema<IComedian>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    bio: { type: String, required: true },
    avatar: { type: String, default: "" },
    banner: { type: String, default: "" },
    socialLinks: {
      instagram: String,
      twitter: String,
      youtube: String,
      tiktok: String,
    },
  },
  { timestamps: true }
);

ComedianSchema.index({ name: "text", bio: "text" });

export const Comedian: Model<IComedian> =
  mongoose.models.Comedian || mongoose.model<IComedian>("Comedian", ComedianSchema);
