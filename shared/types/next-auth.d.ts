// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare interface SessionUser {
  id: string;
  wallet: string;
}

declare module "next-auth" {
  interface User {
    id: string;
    wallet: string;
    accessToken: string;
    accessTokenExpiry: string;
    refreshToken: string;
  }

  interface Session {
    user: SessionUser;
    accessToken: string;
    accessTokenExpiry: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpiry: string;
    refreshToken: string;
    user: SessionUser;
    error?: string;
  }
}
