import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import {
  ConfigurationRequest,
  UpdateConfigurationRequest,
} from "../types/requests";

export function validateConfiguration(
  req: ConfigurationRequest | UpdateConfigurationRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Type guard to check if it's an update request
    const isUpdate = "id" in (req.params || {});

    if (typeof req.body.scaleDown === "string")
      req.body.scaleDown = parseFloat(req.body.scaleDown);

    const { scaleDown, logoPosition } = req.body;

    if (!isUpdate && (!scaleDown || !logoPosition || !req.file))
      throw new AppError("Missing required fields", 400);

    if (scaleDown && (scaleDown <= 0 || scaleDown > 0.25))
      throw new AppError("scaleDown must be between 0 and 0.25", 400);
    if (logoPosition !== undefined) {
      const validPositions = [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ];
      if (!validPositions.includes(logoPosition)) {
        throw new AppError("Invalid logoPosition", 400);
      }
    }

    next();
  } catch (err) {
    next(
      err instanceof SyntaxError
        ? new AppError("Invalid scaleDown format", 400)
        : err
    );
  }
}
