import db from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const access = await db.access.findUnique({
      where: { email },
      include: { user: true }
    });

    if (!access || !access.user) return null;

    return {
      ...access,
      user: access.user
    };
  } catch {
    return null;
  }
};

export const getUserByAccessId = async (id: string) => {
  try {
    const access = await db.access.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!access || !access.user) return null;

    return {
      ...access,
      user: access.user
    };
  } catch {
    return null;
  }
};