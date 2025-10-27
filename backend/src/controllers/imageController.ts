import sharp from "sharp";
import fs from "fs/promises";
import asyncHandler from "express-async-handler";
import { ImageCropRequest } from "../types/requests";
import { AppError } from "../utils/AppError";

// /preview
export const previewImage = asyncHandler(
  async (req: ImageCropRequest, res, next) => {
    const { crop } = req.body;

    const croppedBuffer = await sharp(req.file!.path)
      .extract({
        left: crop.x,
        top: crop.y,
        width: crop.width,
        height: crop.height,
      })
      .resize({
        width: Math.floor(crop.width * 0.05),
        height: Math.floor(crop.height * 0.05),
      })
      .png()
      .toBuffer();

    await fs.unlink(req.file!.path); // cleanup

    res.set("Content-Type", "image/png");
    res.status(200).send(croppedBuffer);
  }
);

// /generate

export const generateImage = asyncHandler(
  async (req: ImageCropRequest, res, next) => {
    if (!req.file) {
      throw new AppError("No image uploaded", 400);
    }

    const { crop } = req.body;

    const croppedBuffer = await sharp(req.file.path)
      .extract({
        left: crop.x,
        top: crop.y,
        width: crop.width,
        height: crop.height,
      })
      .png()
      .toBuffer();

    await fs.unlink(req.file.path); // cleanup

    res.set("Content-Type", "image/png");
    res.status(200).send(croppedBuffer);
  }
);
