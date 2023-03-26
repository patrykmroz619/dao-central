import { rest } from "msw";

import { externalApi } from "../utils";

export const authHandlers = [
  rest.get(externalApi("/auth/login"), async (req, res, ctx) => {
    const response = {
      message: "Message to sign by wallet",
    };

    return res(ctx.status(200), ctx.json(response));
  }),
  rest.post(externalApi("/auth/login"), async (req, res, ctx) => {
    const response = {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      accessTokenExpiry: new Date(Date.now() + 100_000).toISOString(),
    };

    return res(ctx.status(201), ctx.json(response));
  }),
];
