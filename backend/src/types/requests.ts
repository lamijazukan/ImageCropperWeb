import { Request } from "express";
import { CropCoordinates } from "./crop-data";

export interface ImageCropRequest extends Request {
  file?: Express.Multer.File | undefined;
  body: {
    crop: CropCoordinates;
    configId?: string; // Optional ID of logo configuration to apply
  };
}

export interface ConfigurationRequest extends Request {
  file?: Express.Multer.File | undefined;
  body: {
    scaleDown: number;
    logoPosition: string;
  };
}
export interface UpdateConfigurationRequest extends Request {
  file?: Express.Multer.File | undefined;
  body: {
    scaleDown?: number;
    logoPosition?: string;
  };
  params: {
    id: string;
  };
}
