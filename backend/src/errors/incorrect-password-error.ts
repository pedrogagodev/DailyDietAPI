export class IncorrectPasswordError extends Error {
  constructor() {
    super("Incorrect current password");
  }
}
