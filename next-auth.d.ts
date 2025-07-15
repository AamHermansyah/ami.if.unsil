import NextAuth, { type DefaultSession } from "next-auth";
import { Role, Status } from "./lib/generated/prisma";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  status: Status;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}