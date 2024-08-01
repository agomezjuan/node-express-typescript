import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRouter {
  constructor() {}

  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const authController = new AuthController(authRepository);

    router.post("/login", authController.login);
    router.post("/register", authController.register);

    router.get(
      "/users",
      [AuthMiddleware.validateToken],
      authController.getUsers
    );

    return router;
  }
}
