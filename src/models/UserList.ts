import mongoose, { Schema, Document, Model } from "mongoose";

interface WatchHistoryEntry {
  episodeId: string;
  progress: number; // 0-100 percentage
  watchedAt: Date;
}

export interface IUserList extends Document {
  userId: string; // Clerk user ID
  showIds: string[];
  watchHistory: WatchHistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const UserListSchema = new Schema<IUserList>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    showIds: [{ type: String }],
    watchHistory: [
      {
        episodeId: { type: String, required: true },
        progress: { type: Number, default: 0 },
        watchedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const UserList: Model<IUserList> =
  mongoose.models.UserList || mongoose.model<IUserList>("UserList", UserListSchema);
