import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as requestIp from "request-ip";

export const Ip = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return requestIp.getClientIp(request);
  },
);
