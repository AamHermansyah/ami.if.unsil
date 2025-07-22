import { Prisma, Role } from "@/lib/generated/prisma";
import db from "@/lib/prisma";

interface ConfigGet {
  q?: string;
  page?: number;
  limit?: number;
  role?: string;
}

export async function getAllEmailAccess(config?: ConfigGet) {
  const { q = "", page = 1, limit = 10, role } = config || {};

  const skip = (page - 1) * limit;

  // Gunakan Prisma type-safe input
  const where: Prisma.AccessWhereInput = {};
  if (q) {
    where.email = {
      contains: q,
      mode: "insensitive",
    };
  }

  if (role) {
    where.role = role.toUpperCase() as Role;
  }

  try {
    const [emails, total] = await Promise.all([
      db.access.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }),
      db.access.count({ where }),
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
