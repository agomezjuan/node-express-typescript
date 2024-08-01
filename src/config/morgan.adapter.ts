import morgan from "morgan";
import { Request, Response } from "express";

export class MorganAdapter {
  static create(format: string = "combined") {
    return morgan(format);
  }

  static createCustom() {
    return morgan((tokens: any, req: Request, res: Response) => {
      return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        contentLength: tokens.res(req, res, "content-length"),
        responseTime: tokens["response-time"](req, res),
        timestamp: new Date().toISOString(),
      });
    });
  }
}
