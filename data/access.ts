import db from "@/lib/prisma";

interface ConfigGet {
  q?: string;
}

export async function getAllEmailAccess(config?: ConfigGet) {
  const { q } = config || {}

  try {
    const emails = await db.access.findMany({
      where: q ? { email: { contains: q, mode: 'insensitive' } } : undefined,
      orderBy: { createdAt: 'desc' }
    })

    return {
      success: true,
      data: emails
    }
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}