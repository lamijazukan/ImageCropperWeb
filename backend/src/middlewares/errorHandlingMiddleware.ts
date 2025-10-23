import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack || err);

  const statusCode =
    err instanceof AppError && err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
