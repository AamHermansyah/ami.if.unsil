import { getAllCriteriaWithIndicatorCount } from "@/data/criteria";
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const keyword = searchParams.get('q') || '';

  try {
    const session = await auth();
    if ((session?.user?.role !== 'AUDITOR') || session.user.status !== 'ACTIVE') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const criterias = await getAllCriteriaWithIndicatorCount({
      q: keyword
    });

    if (criterias.error) {
      return new NextResponse(criterias.message, { status: 500 });
    };

    return NextResponse.json(criterias.data!, {
      status: 200
    })
  } catch (error) {
    console.log('ERROR GET ALL CRITERIAS API : ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}