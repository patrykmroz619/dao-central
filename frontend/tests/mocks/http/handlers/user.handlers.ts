import { rest } from "msw";
import { externalApi } from "../utils";

export const userHandlers = [
  rest.get(externalApi("/users/me"), async (req, res, ctx) => {
    const response = {
      id: "user-id",
      walletAddress: "0x3045A76F03e0C1b44eB154e6c2085D480609Aa1B",
      createdAt: new Date().toISOString(),
    };

    return res(ctx.status(200), ctx.json(response));
  }),
];
