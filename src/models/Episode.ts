import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEpisode extends Document {
  seriesId: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  duration: number; // in seconds
  thumbnail: string;
  videoUrl: string;
  episodeNumber: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const EpisodeSchema = new Schema<IEpisode>(
  {
    seriesId: { type: Schema.Types.ObjectId, ref: "Series", required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    thumbnail: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    episodeNumber: { type: Number, required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

EpisodeSchema.index({ title: "text", description: "text" });

export const Episode: Model<IEpisode> =
  mongoose.models.Episode || mongoose.model<IEpisode>("Episode", EpisodeSchema);
