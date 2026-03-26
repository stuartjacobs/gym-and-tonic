import { connectDB } from "@/lib/mongodb";
import { Comedian } from "@/models";
import { json, error } from "@/lib/api";

export async function GET() {
  try {
    await connectDB();
    const comedians = await Comedian.find({}).sort({ name: 1 }).lean();
    return json(comedians);
  } catch (e: unknown) {
    return error((e as Error).message);
  }
}
