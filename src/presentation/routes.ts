import { Router } from "express";
import { AuthRouter } from "./auth/routes";

// API version 1
const V1 = "/api/v1";

export class AppRouter {
  constructor() {}

  static get routes(): Router {
    const router = Router();

    router.use(`${V1}/auth`, AuthRouter.routes);

    return router;
  }
}
