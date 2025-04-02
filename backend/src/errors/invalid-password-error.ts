export class InvalidPasswordError extends Error {
  constructor() {
    super("Please, provide a valid password.");
  }
}
