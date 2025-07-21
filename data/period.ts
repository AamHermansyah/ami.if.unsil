import db from "@/lib/prisma";

interface ConfigGet {
  q?: string;
  page?: number;
  limit?: number;
}

export async function getAllPeriods(config?: ConfigGet) {
  const { q = "", page = 1, limit = 10 } = config || {};

  const skip = (page - 1) * limit;

  try {
    // Ambil data paginasi
    const [periods, total] = await Promise.all([
      db.period.findMany({
        where: q ? { name: { contains: q, mode: "insensitive" } } : undefined,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.period.count({
        where: q ? { name: { contains: q, mode: "insensitive" } } : undefined,
      }),
    ]);

    return {
      success: true,
      data: {
        items: periods,
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

export async function getPeriodByName(periodName: string) {
  if (!periodName) return {
    success: true,
    data: null
  }

  try {
    const period = await db.period.findUnique({
      where: { name: periodName }
    });

    return {
      success: true,
      data: period
    }
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}
