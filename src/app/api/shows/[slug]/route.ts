import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Show, Series, Comedian } from "@/models";
import { json, error } from "@/lib/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;

    const show = await Show.findOne({ slug })
      .populate("comedianId")
      .lean();

    if (!show) return error("Show not found", 404);

    const series = await Series.find({ showId: show._id })
      .sort({ seasonNumber: 1 })
      .lean();

    return json({ ...show, series });
  } catch (e: unknown) {
    return error((e as Error).message);
  }
}
