import { ethers } from "ethers";
import * as request from "supertest";

export const login = async (httpServer: any, wallet: ethers.Wallet) => {
  const initLoginResponse = await request(httpServer).get(
    `/auth/login?walletAddress=${wallet.address}`,
  );

  const signature = await wallet.signMessage(initLoginResponse.body.message);
  const userAgent = `user-agent-${Math.random() * 100}`;

  const loginResponse = await request(httpServer)
    .post("/auth/login")
    .set("user-agent", userAgent)
    .send({
      walletAddress: wallet.address,
      signature,
    });

  const { accessToken, refreshToken } = loginResponse.body;

  return {
    userAgent,
    accessToken,
    refreshToken,
  };
};
