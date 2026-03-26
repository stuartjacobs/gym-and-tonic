import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Show, Comedian, Episode } from "@/models";
import { json, error } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const q = new URL(req.url).searchParams.get("q") || "";
    if (!q.trim()) return json({ shows: [], comedians: [], episodes: [] });

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

    const [shows, comedians, episodes] = await Promise.all([
      Show.find({ $or: [{ title: regex }, { description: regex }, { tags: regex }] })
        .populate("comedianId", "name slug avatar")
        .limit(20)
        .lean(),
      Comedian.find({ $or: [{ name: regex }, { bio: regex }] })
        .limit(10)
        .lean(),
      Episode.find({ $or: [{ title: regex }, { description: regex }] })
        .limit(20)
        .lean(),
    ]);

    return json({ shows, comedians, episodes });
  } catch (e: unknown) {
    return error((e as Error).message);
  }
}
