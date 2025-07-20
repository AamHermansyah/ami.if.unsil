import { getAllPeriods } from "@/data/period";
import { auth } from "@/lib/auth";
import { paginationSchema } from "@/lib/schemas/pagination";
import { NextResponse } from "next/server";
import z from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  try {
    const session = await auth();
    if (
      session?.user?.role !== "AUDITOR" ||
      session.user.status !== "ACTIVE"
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validasi dan parsing query
    const parsed = z.object(paginationSchema).safeParse(searchParams);
    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);

      return NextResponse.json(
        { error: "Invalid query", details: tree.errors.join(', ') },
        { status: 400 }
      );
    }

    const { q = "", page, limit } = parsed.data;

    const res = await getAllPeriods({
      q,
      page,
      limit,
    });

    if (res?.error) {
      return new NextResponse(res.message, { status: 500 });
    }

    return NextResponse.json(res.data!, {
      status: 200,
    });
  } catch (error) {
    console.error("ERROR GET ALL PERIODS API: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
