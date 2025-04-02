export class DatabaseConnectionError extends Error {
  constructor(message = "Failed to connect to database.") {
    super(message);
  }
}
