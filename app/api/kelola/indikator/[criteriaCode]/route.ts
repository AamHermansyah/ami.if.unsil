import { getAllIndicatorsByCriteriaCode } from "@/data/indicator";
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

interface IParams {
  criteriaCode?: string;
}

export async function GET(req: Request, { params }: { params: Promise<IParams> }) {
  const criteriaCode = (await params)?.criteriaCode;

  if (!criteriaCode) {
    return new NextResponse('Invalid input', { status: 400 });
  }

  try {
    const session = await auth();
    if ((session?.user?.role !== 'AUDITEE') || session.user.status !== 'ACTIVE') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const indicator = await getAllIndicatorsByCriteriaCode(criteriaCode);

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