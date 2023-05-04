export class DaoAlreadyExistsException extends Error {
  constructor() {
    super("Dao already exists");
  }
}
