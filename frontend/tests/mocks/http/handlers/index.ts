import { authHandlers } from "./auth.handlers";
import { daoHandlers } from "./dao.handlers";
import { userHandlers } from "./user.handlers";

export const handlers = [...authHandlers, ...userHandlers, ...daoHandlers];
