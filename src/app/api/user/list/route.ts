import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { UserList, Show } from "@/models";
import { json, error } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.headers.get("x-user-id");
    if (!userId) return error("Unauthorized", 401);

    const userList = await UserList.findOne({ userId }).lean();
    if (!userList) return json({ showIds: [], watchHistory: [] });

    const shows = await Show.find({ _id: { $in: userList.showIds } })
      .populate("comedianId", "name slug avatar")
      .lean();

    return json({ ...userList, shows });
  } catch (e: unknown) {
    return error((e as Error).message);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.headers.get("x-user-id");
    if (!userId) return error("Unauthorized", 401);

    const { showId, action } = await req.json();

    if (action === "add") {
      await UserList.findOneAndUpdate(
        { userId },
        { $addToSet: { showIds: showId } },
        { upsert: true }
      );
    } else if (action === "remove") {
      await UserList.findOneAndUpdate(
        { userId },
        { $pull: { showIds: showId } }
      );
    }

    return json({ success: true });
  } catch (e: unknown) {
    return error((e as Error).message);
  }
}
