import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {
  public static async validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authorization = req.header("Authorization");
    if (!authorization) return CustomError.unauthorized("Token not provided");
    if (!authorization.startsWith("Bearer "))
      return CustomError.unauthorized("Invalid token format");

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.verifyToken<{ email: string }>(token);
      if (!payload) return CustomError.unauthorized("Invalid token");

      const user = await UserModel.findOne({ email: payload.email });
      if (!user) return CustomError.unauthorized("Invalid token");

      req.body.user = user;
      next();
    } catch (error) {
      return CustomError.internal();
    }
  }
}
