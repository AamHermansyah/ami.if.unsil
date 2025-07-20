import { getAllIndicatorAudits } from "@/data/indicator-audit";
import { auth } from "@/lib/auth"
import { AchievementLabel, FindingStatus } from "@/lib/generated/prisma";
import { paginationSchema } from "@/lib/schemas/pagination";
import { NextResponse } from "next/server"
import z from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  try {
    const session = await auth();
    if (session?.user.status !== 'ACTIVE') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const parsed = z.object({
      ...paginationSchema,
      criteriaId: z.string().trim().optional(),
      achievementLabel: z.enum(AchievementLabel).optional(),
      periodId: z.string().trim().min(1),
      findingStatus: z.enum(FindingStatus).optional(),
    }).safeParse(searchParams);

    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);

      return NextResponse.json(
        { error: "Invalid query", details: tree.errors.join(', ') },
        { status: 400 }
      );
    }

    const indicators = await getAllIndicatorAudits({ ...parsed.data });

    if (indicators.error) {
      return new NextResponse(indicators.message, { status: 500 });
    };

    return NextResponse.json(indicators.data!, {
      status: 200
    })
  } catch (error) {
    console.log('ERROR GET ALL INDICATOR AUDTIS CODE API : ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}