import { HttpError } from "./httpError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHttpError = (error: any): error is HttpError => {
  if (error?.name === "HttpError") {
    return true;
  }

  return false;
};
