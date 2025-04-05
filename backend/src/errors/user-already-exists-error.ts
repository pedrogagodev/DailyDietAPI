export class UserAlreadyExistsError extends Error {
  constructor(message = "E-mail already in use") {
    super(message);
  }
}
