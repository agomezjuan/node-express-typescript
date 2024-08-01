import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(error); // Log the error with Winston or similar
    res.status(500).json({ error: "Internal Server Error" });
  }

  public register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authRepository
      .registerUser(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  public login = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    res.json(registerUserDto);
  };
}
