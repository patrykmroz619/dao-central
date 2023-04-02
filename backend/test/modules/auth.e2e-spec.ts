import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import * as ethers from "ethers";
import { onTestsEnd, expectApiError, prepareFixture } from "../test.helper";
import { ERRORS } from "../../src/constants";
import { login } from "../utils/login-test.utils";

describe("AuthModule (e2e)", () => {
  let app: INestApplication;
  let httpServer: any;

  beforeEach(async () => {
    app = await prepareFixture();
    httpServer = app.getHttpServer();
  });

  describe("/auth/login", () => {
    it("should throw error during initialize login process when wallet address is incorrect", async () => {
      const initLoginResponse = await request(httpServer).get(
        `/auth/login?walletAddress=abc`,
      );

      expectApiError(
        initLoginResponse,
        HttpStatus.BAD_REQUEST,
        ERRORS.auth.invalidEthAddress,
      );
    });

    it("should allow to initialize the login process", async () => {
      const wallet = ethers.Wallet.createRandom();

      const initLoginResponse = await request(httpServer).get(
        `/auth/login?walletAddress=${wallet.address}`,
      );

      expect(initLoginResponse.status).toEqual(HttpStatus.OK);
      expect(initLoginResponse.body).toHaveProperty("message");
      expect(initLoginResponse.body.message).toMatch(
        /Please sign this message to log in/,
      );
    });

    it("should not allow to log in when the signed message is invalid", async () => {
      const wallet = ethers.Wallet.createRandom();

      const initLoginResponse = await request(httpServer).get(
        `/auth/login?walletAddress=${wallet.address}`,
      );

      const brokenMessage = initLoginResponse.body.message + ":)";
      const signature = await wallet.signMessage(brokenMessage);

      const loginResponse = await request(httpServer).post("/auth/login").send({
        walletAddress: wallet.address,
        signature,
      });

      expectApiError(
        loginResponse,
        HttpStatus.UNAUTHORIZED,
        ERRORS.auth.invalidSignature,
      );
    });

    it("should not allow to log in when signature is signed by different wallet", async () => {
      const walletA = ethers.Wallet.createRandom();
      const walletB = ethers.Wallet.createRandom();

      const initLoginResponse = await request(httpServer).get(
        `/auth/login?walletAddress=${walletA.address}`,
      );

      const signedMessageByWalletB = await walletB.signMessage(
        initLoginResponse.body.message,
      );

      const loginResponse = await request(httpServer).post("/auth/login").send({
        walletAddress: walletA.address,
        signature: signedMessageByWalletB,
      });

      expectApiError(
        loginResponse,
        HttpStatus.UNAUTHORIZED,
        ERRORS.auth.invalidSignature,
      );
    });

    it("should log in a user with correct signature", async () => {
      const wallet = ethers.Wallet.createRandom();

      const initLoginResponse = await request(httpServer).get(
        `/auth/login?walletAddress=${wallet.address}`,
      );

      const signature = await wallet.signMessage(
        initLoginResponse.body.message,
      );

      const loginResponse = await request(httpServer).post("/auth/login").send({
        walletAddress: wallet.address,
        signature,
      });

      const { accessToken, refreshToken } = loginResponse.body;

      expect(loginResponse.status).toEqual(HttpStatus.CREATED);
      expect(accessToken).toBeDefined();
      expect(refreshToken).toBeDefined();
    });

    it("should not allow to log in twice with the same signature", async () => {
      const wallet = ethers.Wallet.createRandom();

      const initLoginResponse = await request(httpServer).get(
        `/auth/login?walletAddress=${wallet.address}`,
      );

      const signature = await wallet.signMessage(
        initLoginResponse.body.message,
      );

      const firstLoginResponse = await request(httpServer)
        .post("/auth/login")
        .send({
          walletAddress: wallet.address,
          signature,
        });

      expect(firstLoginResponse.status).toEqual(HttpStatus.CREATED);

      const secondLoginResponse = await request(httpServer)
        .post("/auth/login")
        .send({
          walletAddress: wallet.address,
          signature,
        });

      expectApiError(
        secondLoginResponse,
        HttpStatus.UNAUTHORIZED,
        ERRORS.auth.invalidSignature,
      );
    });
  });

  describe("/auth/logout", () => {
    it("should allow to log out", async () => {
      const wallet = ethers.Wallet.createRandom();

      const { accessToken, userAgent } = await login(httpServer, wallet);

      const logoutResponse = await request(httpServer)
        .delete("/auth/logout")
        .set("user-agent", userAgent)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(logoutResponse.status).toEqual(HttpStatus.OK);
    });
  });

  describe("/auth/refresh", () => {
    it("should not allow to refresh token with invalid refresh token", async () => {
      const wallet = ethers.Wallet.createRandom();

      const { accessToken, userAgent } = await login(httpServer, wallet);

      const refreshTokenResponse = await request(httpServer)
        .post("/auth/refresh")
        .set("user-agent", userAgent)
        .set("Authorization", `Bearer ${accessToken}`);

      expectApiError(
        refreshTokenResponse,
        HttpStatus.UNAUTHORIZED,
        "Unauthorized",
      );
    });

    it("should allow to refresh tokens", async () => {
      const wallet = ethers.Wallet.createRandom();

      const { refreshToken, userAgent } = await login(httpServer, wallet);

      const refreshTokenResponse = await request(httpServer)
        .post("/auth/refresh")
        .set("user-agent", userAgent)
        .set("Authorization", `Bearer ${refreshToken}`);

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        refreshTokenResponse.body;

      expect(refreshTokenResponse.status).toEqual(HttpStatus.CREATED);
      expect(newAccessToken).toBeDefined();
      expect(newRefreshToken).toBeDefined();
    });
  });

  afterAll(async () => {
    await onTestsEnd(app);
    await app.close();
  });
});
