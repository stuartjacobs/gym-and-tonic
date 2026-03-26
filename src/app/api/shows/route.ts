import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Show, Comedian } from "@/models";
import { json, error } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (featured === "true") filter.featured = true;

    const shows = await Show.find(filter)
      .populate("comedianId", "name slug avatar")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return json(shows);
  } catch (e: unknown) {
    return error((e as Error).message);
  }
}
