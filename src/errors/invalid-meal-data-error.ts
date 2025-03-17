export class InvalidMealDataError extends Error {
  constructor(message = "Invalid meal data provided.") {
    super(message);
  }
}
