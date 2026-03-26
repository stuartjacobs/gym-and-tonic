import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IShow extends Document {
  comedianId: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  banner: string;
  category: string;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ShowSchema = new Schema<IShow>(
  {
    comedianId: { type: Schema.Types.ObjectId, ref: "Comedian", required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    banner: { type: String, default: "" },
    category: { type: String, required: true, index: true },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

ShowSchema.index({ title: "text", description: "text", tags: "text" });

export const Show: Model<IShow> =
  mongoose.models.Show || mongoose.model<IShow>("Show", ShowSchema);
