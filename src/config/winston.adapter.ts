import winston from "winston";

export class WinstonAdapter {
  private static logger: winston.Logger;

  static createLogger() {
    if (!this.logger) {
      const consoleFormat = winston.format.printf(
        ({ level, message, timestamp, ...metadata }) => {
          let msg = `[${timestamp}] [${level}] : ${message} `;
          if (Object.keys(metadata).length > 0) {
            msg += JSON.stringify(metadata);
          }
          return msg;
        }
      );

      this.logger = winston.createLogger({
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp({ format: "DD/MMM/YYYY HH:mm:ss" }),
              consoleFormat
            ),
          }),
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
          }),
          new winston.transports.File({ filename: "logs/combined.log" }),
        ],
      });
    }
    return this.logger;
  }

  static log(level: string, message: string, meta?: any) {
    if (!this.logger) {
      this.createLogger();
    }
    this.logger.log(level, message, meta);
  }

  static info(message: string, meta?: any) {
    this.log("info", message, meta);
  }

  static error(message: string, meta?: any) {
    this.log("error", message, meta);
  }

  static warn(message: string, meta?: any) {
    this.log("warn", message, meta);
  }
}
