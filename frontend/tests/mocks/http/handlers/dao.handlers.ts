import { rest } from "msw";
import { externalApi } from "../utils";

export const daoHandlers = [
  rest.get(externalApi("/dao"), async (req, res, ctx) => {
    const response = {
      data: [],
      count: 0,
    };

    return res(ctx.status(200), ctx.json(response));
  }),
];
