import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ImageCropRequest } from "../types/request";

export function validateCrop(
  req: ImageCropRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (typeof req.body.crop === "string") {
      req.body.crop = JSON.parse(req.body.crop);
    }

    const { crop } = req.body;

    // Check individual properties exist
    if (
      crop.x === undefined ||
      crop.y === undefined ||
      crop.width === undefined ||
      crop.height === undefined
    ) {
      throw new AppError(
        "All crop values (x, y, width, height) must be provided",
        400
      );
    }

    const values = [crop.x, crop.y, crop.width, crop.height];
    if (values.some((v) => Number(v) <= 0)) {
      throw new AppError("All crop values must be positive numbers", 400);
    }

    next();
  } catch (err) {
    // Only catch JSON.parse errors specifically
    if (err instanceof SyntaxError) {
      next(new AppError("Invalid crop JSON format", 400));
    } else {
      next(err);
    }
  }
}
