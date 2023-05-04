export class DaoNotFoundException extends Error {
  constructor() {
    super("DAO not found");
  }
}
