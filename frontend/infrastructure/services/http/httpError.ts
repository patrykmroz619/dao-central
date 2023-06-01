/* eslint-disable @typescript-eslint/no-explicit-any */
export class HttpError extends Error {
  public name = "HttpError";
  public status: number;
  public data: any;

  constructor(message: string, status: number, data: any) {
    super(message);

    this.status = status;
    this.data = data;
  }
}
