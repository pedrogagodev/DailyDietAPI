export class UnauthorizedAccessError extends Error {
  constructor() {
    super("You are not authorized to access this resource.");
  }
}
