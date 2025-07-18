import { getAllIndicators } from "@/data/indicator";
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth();
    if ((session?.user?.role !== 'AUDITOR') || session.user.status !== 'ACTIVE') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const indicator = await getAllIndicators();

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