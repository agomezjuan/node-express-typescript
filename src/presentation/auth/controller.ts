import { Request, Response } from "express";
import { AuthRepository, RegisterUserDto } from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  public login = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    res.json(registerUserDto);
  };

  public register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authRepository
      .registerUser(registerUserDto!)
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        res.status(error.statusCode).json({ error: error.message });
      });
  };
}
