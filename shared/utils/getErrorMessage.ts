const DEFAULT_MESSAGE = "Something went wrong, try again later!";

export const getErrorMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  defaultMessage = DEFAULT_MESSAGE
) => {
  if (typeof error === "object" && error) {
    // Check if error from the wallet
    if (error.hasOwnProperty("reason")) {
      return error.reason;
    }

    // Check if
    if (error.hasOwnProperty("statusCode") && error.hasOwnProperty("message")) {
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
