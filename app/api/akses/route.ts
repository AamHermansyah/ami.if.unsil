import { getAllEmailAccess } from "@/data/access";
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const keyword = searchParams.get('q') || '';

  try {
    const session = await auth();
    if (!session || !session.user || (session.user.role !== 'AUDITOR')) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const emails = await getAllEmailAccess({
      q: keyword
    });

    if (emails.error) throw new Error(emails.message);

    return NextResponse.json(emails.data!, {
      status: 200
    })
  } catch (error) {
    console.log('ERROR GET ALL ACCESS API: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}