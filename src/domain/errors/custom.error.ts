import { WinstonAdapter } from "../../config";

export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message: string) {
    WinstonAdapter.error(message);
    return new CustomError(400, message);
  }

  static unauthorized(message: string) {
    WinstonAdapter.error(message);
    return new CustomError(401, message);
  }

  static forbidden(message: string) {
    WinstonAdapter.error(message);
    return new CustomError(403, message);
  }

  static notFound(message: string) {
    WinstonAdapter.error(message);
    return new CustomError(404, message);
  }

  static conflict(message: string) {
    WinstonAdapter.error(message);
    return new CustomError(409, message);
  }

  static internal(message: string = "Internal server error") {
    WinstonAdapter.error(message);
    return new CustomError(500, message);
  }
}
