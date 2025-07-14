import NextAuth, { type DefaultSession } from "next-auth";
import { Role } from "./lib/generated/prisma";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}