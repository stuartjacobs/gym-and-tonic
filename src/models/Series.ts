import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ISeries extends Document {
  showId: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  seasonNumber: number;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

const SeriesSchema = new Schema<ISeries>(
  {
    showId: { type: Schema.Types.ObjectId, ref: "Show", required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    description: { type: String, required: true },
    seasonNumber: { type: Number, required: true },
    thumbnail: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Series: Model<ISeries> =
  mongoose.models.Series || mongoose.model<ISeries>("Series", SeriesSchema);
