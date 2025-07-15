import db from "@/lib/prisma";

interface ConfigGet {
  q?: string;
  page?: number;
  limit?: number;
}

export async function getAllEmailAccess(config?: ConfigGet) {
  const { q = "", page = 1, limit = 10 } = config || {};

  const skip = (page - 1) * limit;

  try {
    // Ambil data paginasi
    const [emails, total] = await Promise.all([
      db.access.findMany({
        where: q ? { email: { contains: q, mode: "insensitive" } } : undefined,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.access.count({
        where: q ? { email: { contains: q, mode: "insensitive" } } : undefined,
      }),
    ]);

    return {
      success: true,
      data: {
        items: emails,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}
