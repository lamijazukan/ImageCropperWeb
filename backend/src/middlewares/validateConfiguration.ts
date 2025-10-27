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
    const isUpdateRequest = (req: any): req is UpdateConfigurationRequest => {
      return "params" in req && "id" in req.params;
    };

    if (typeof req.body.scaleDown === "string") {
      req.body.scaleDown = parseFloat(req.body.scaleDown);
    }

    const { scaleDown, logoPosition } = req.body;

    if (!isUpdateRequest(req)) {
      if (
        scaleDown === undefined ||
        logoPosition === undefined ||
        req.file === undefined
      ) {
        throw new AppError(
          "scaleDown, logoPosition and logoImage must be provided",
          400
        );
      }
    }

    if (scaleDown !== undefined) {
      if (scaleDown <= 0 || scaleDown > 0.25) {
        throw new AppError(
          "scaleDown must be a decimal between 0 and 0.25",
          400
        );
      }
    }
    if (logoPosition !== undefined) {
      const validPositions = [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ];
      if (!validPositions.includes(logoPosition)) {
        throw new AppError(
          `logoPosition must be one of: ${validPositions.join(", ")}`,
          400
        );
      }
    }

    next();
  } catch (err) {
    if (err instanceof SyntaxError) {
      next(new AppError("Invalid scaleDown format", 400));
    } else {
      next(err);
    }
  }
}
