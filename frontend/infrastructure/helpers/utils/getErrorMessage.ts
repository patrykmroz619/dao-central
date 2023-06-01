import { isHttpError } from "@/infrastructure/services/http/isHttpError";

const DEFAULT_MESSAGE = "Something went wrong, try again later!";

export const getErrorMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  defaultMessage = DEFAULT_MESSAGE
) => {
  if (typeof error === "object" && error) {
    // Check if error is the HttpError
    if (isHttpError(error)) {
      if (error.data.hasOwnProperty("message")) {
        return error.data.message;
      }
    }

    // Check if error from the wallet
    if (error.hasOwnProperty("reason")) {
      return error.reason;
    }

    if (error instanceof Error) {
      return error.message;
    }
  }

  if (typeof error === "string") {
    return error;
  }

  return defaultMessage;
};
