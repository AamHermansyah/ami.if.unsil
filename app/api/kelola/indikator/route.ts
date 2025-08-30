import { getAllIndicators } from "@/data/indicator";
import { auth } from "@/lib/auth"
import { paginationSchema } from "@/lib/schemas/pagination";
import { NextResponse } from "next/server"
import z from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  try {
    const session = await auth();
    if ((session?.user?.role !== 'AUDITEE') || session.user.status !== 'ACTIVE') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const parsed = z.object({
      ...paginationSchema,
      criteriaId: z.string().trim().optional(),
    }).safeParse(searchParams);

    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);

      return NextResponse.json(
        { error: "Invalid query", details: tree.errors.join(', ') },
        { status: 400 }
      );
    }

    const indicator = await getAllIndicators({ ...parsed.data });

    if (indicator.error) {
      return new NextResponse(indicator.message, { status: 500 });
    };

    return NextResponse.json(indicator.data!, {
      status: 200
    })
  } catch (error) {
    console.log('ERROR GET ALL INDICATOR WITH CRITERIA CODE API : ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}