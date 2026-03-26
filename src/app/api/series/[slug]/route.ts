export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Series, Episode, Show } from "@/models";
import { json, error } from "@/lib/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;

    const series = await Series.findOne({ slug }).lean();
    if (!series) return error("Series not found", 404);

    const episodes = await Episode.find({ seriesId: series._id })
      .sort({ episodeNumber: 1 })
      .lean();

    const show = await Show.findById(series.showId)
      .populate("comedianId", "name slug avatar")
      .lean();

    return json({ series, episodes, show });
  } catch (e: unknown) {
    return error((e as Error).message);
  }
}
