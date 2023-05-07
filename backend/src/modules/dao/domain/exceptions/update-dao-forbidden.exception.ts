export class UpdateDaoForbiddenException extends Error {
  constructor() {
    super("Update dao forbidden");
  }
}
