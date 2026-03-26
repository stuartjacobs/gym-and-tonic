export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { UserList } from "@/models";
import { json, error } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.headers.get("x-user-id");
    if (!userId) return error("Unauthorized", 401);

    const userList = await UserList.findOne({ userId }).lean();
    return json(userList?.watchHistory || []);
  } catch (e: unknown) {
    return error((e as Error).message);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.headers.get("x-user-id");
    if (!userId) return error("Unauthorized", 401);

    const { episodeId, progress } = await req.json();

    await UserList.findOneAndUpdate(
      { userId },
      {
        $pull: { watchHistory: { episodeId } },
      }
    );

    await UserList.findOneAndUpdate(
      { userId },
      {
        $push: {
          watchHistory: {
            $each: [{ episodeId, progress, watchedAt: new Date() }],
            $position: 0,
            $slice: 100,
          },
        },
      },
      { upsert: true }
    );

    return json({ success: true });
  } catch (e: unknown) {
    return error((e as Error).message);
  }
}
