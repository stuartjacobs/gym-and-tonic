export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Episode, Series, Show } from "@/models";
import { json, error } from "@/lib/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const episode = await Episode.findById(id).lean();
    if (!episode) return error("Episode not found", 404);

    // Increment views
    await Episode.findByIdAndUpdate(id, { $inc: { views: 1 } });

    // Get sibling episodes (same series)
    const siblings = await Episode.find({ seriesId: episode.seriesId })
      .sort({ episodeNumber: 1 })
      .lean();

    // Get series and show info
    const series = await Series.findById(episode.seriesId).lean();
    const show = series
      ? await Show.findById(series.showId).populate("comedianId", "name slug avatar").lean()
      : null;

    return json({ episode, siblings, series, show });
  } catch (e: unknown) {
    return error((e as Error).message);
  }
}
