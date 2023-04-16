export class InvalidLoginSignatureException extends Error {
  constructor() {
    super("Invalid login signature");
  }
}
