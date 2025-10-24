import { Request } from "express";
import { CropCoordinates } from "./image";

export interface ImageCropRequest extends Request {
  file?: Express.Multer.File | undefined;
  body: {
    crop: CropCoordinates;
  };
}
