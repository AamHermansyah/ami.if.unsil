import NextAuth from "next-auth";
import db from "./prisma";
import { getUserByEmail } from "@/data/user";
import { Role, Status } from "./generated/prisma";
import authConfig from "./auth-config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      if (!user.email || !user.email.endsWith("unsil.ac.id")) {
        console.error("Login attempt failed: Email is not from unsil.ac.id domain.");
        return false;
      }

      try {
        const access = await db.access.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!access) {
          console.error(`Login attempt failed: Email ${user.email} is not registered in the Access table.`);
          return false;
        }

        const existingUser = await getUserByEmail(access.email);

        if (!existingUser) {
          const newUser = await db.user.create({
            data: {
              name: user.name ?? "",
              image: user.image,
            },
          });

          await db.access.update({
            where: { email: access.email },
            data: { userId: newUser.id }
          });
        } else if (existingUser.status === 'ACTIVE') {
          if (user.image) {
            await db.user.update({
              where: { id: existingUser.user.id },
              data: { image: user.image }
            });
          }
        } else {
          console.error(`Login attempt failed: Email ${user.email} is not activated in the Access table.`);
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (token.status && session.user) {
        session.user.status = token.status as Status;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.email) return token;

      const access = await getUserByEmail(token.email);

      if (!access) return token;

      token.sub = access.user.id;
      token.name = access.user.name;
      token.email = access.email;
      token.role = access.role;
      token.status = access.status;

      return token;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  session: { strategy: "jwt" },
  ...authConfig,
});