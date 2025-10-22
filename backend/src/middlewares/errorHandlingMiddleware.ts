import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack || err);
  res
    .status(500)
    .json({ success: false, message: err.message || "Internal Server Error" });
}
