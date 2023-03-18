/* eslint-disable @typescript-eslint/no-explicit-any */
export class HttpError extends Error {
  public name = "HttpError";
  public data: any;

  constructor(message: string, data: any) {
    super(message);

    this.data = data;
  }
}
