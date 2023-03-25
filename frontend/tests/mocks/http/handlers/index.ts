import { rest } from "msw";
import { externalApi } from "../utils";

export const handlers = [
  rest.get(externalApi("/mock-endpoint"), async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Message",
      })
    );
  }),
];
