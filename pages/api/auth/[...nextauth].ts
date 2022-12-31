import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { restAPI } from "shared/api";

export const authOptions: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialProvider({
      name: "wallet",
      credentials: {
        walletAddress: { label: "Wallet address", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        if (credentials) {
          const {
            data: { accessToken, refreshToken, accessTokenExpiry },
          } = await restAPI.auth.login.loginByWallet(
            credentials.walletAddress,
            credentials.signature
          );

          const {
            data: { id, walletAddress },
          } = await restAPI.users.me(accessToken);

          const user: User = {
            id,
            wallet: walletAddress,
            accessToken,
            refreshToken,
            accessTokenExpiry,
          };

          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // This will only be executed at login. Each next invocation will skip this part.
      if (user) {
        const { accessToken, refreshToken, accessTokenExpiry, ...rest } = user;
        return {
          user: rest,
          accessToken,
          refreshToken,
          accessTokenExpiry,
        };
      }

      // Return current token if the access token has not expired yet
      if (new Date(token.accessTokenExpiry) > new Date()) {
        return token;
      }

      try {
        const {
          data: { accessToken, accessTokenExpiry, refreshToken },
        } = await restAPI.auth.refresh(token.refreshToken);

        token.accessToken = accessToken;
        token.accessTokenExpiry = accessTokenExpiry;
        token.refreshToken = refreshToken;
        return {
          user: token.user,
          accessToken,
          refreshToken,
          accessTokenExpiry,
        };
      } catch {
        return {
          user: token.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpiry: token.accessTokenExpiry,
          error: "refresh-error",
        };
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.accessTokenExpiry = token.accessTokenExpiry;
      session.user = token.user;
      return session;
    },
  },
};
export default NextAuth(authOptions);
