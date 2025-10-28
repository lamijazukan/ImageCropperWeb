import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ImageCropRequest } from "../types/requests";
import { CropCoordinates } from "../types/crop-data";

export function validateCrop(
  req: ImageCropRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (typeof req.body.crop === "string") {
      req.body.crop = JSON.parse(req.body.crop);
    }
    if (!req.file) {
      throw new AppError("No image uploaded", 400);
    }
    const crop = req.body.crop;
    const { x, y, width, height } = req.body.crop;
    if (
      ["x", "y", "width", "height"].some(
        (v) => crop[v as keyof CropCoordinates] === undefined
      )
    ) {
      throw new AppError("Missing crop values: x, y, width, height", 400);
    }

    if ([x, y, width, height].some((v) => Number(v) <= 0)) {
      throw new AppError("Crop values must be positive numbers", 400);
    }

    next();
  } catch (err) {
    next(
      err instanceof SyntaxError
        ? new AppError("Invalid crop JSON format", 400)
        : err
    );
  }
}
