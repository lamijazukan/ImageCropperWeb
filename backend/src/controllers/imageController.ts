import sharp from "sharp";
import fs from "fs/promises";
import asyncHandler from "express-async-handler";
import { ImageCropRequest } from "../types/requests";
import { prisma } from "../prisma-client";
import { gravityMap } from "../utils/sharpGravityMapper";

// /preview
export const previewImage = asyncHandler(
  async (req: ImageCropRequest, res, next) => {
    const { crop } = req.body;

    const croppedImage = await sharp(req.file!.path)
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
    res.status(200).send(croppedImage);
  }
);

// /generate

export const generateImage = asyncHandler(
  async (req: ImageCropRequest, res, next) => {
    const { crop } = req.body;

    let croppedImage = await sharp(req.file!.path)
      .extract({
        left: crop.x,
        top: crop.y,
        width: crop.width,
        height: crop.height,
      })
      .png()
      .toBuffer();

    await fs.unlink(req.file!.path); // cleanup

    const { configId } = req.body;

    const config = configId
      ? await prisma.configuration.findUnique({ where: { id: configId } })
      : null;

    if (config?.logoImage) {
      const logo = await sharp(config.logoImage)
        .resize({
          width: Math.round(crop.width * config.scaleDown),
          height: Math.round(crop.height * config.scaleDown),
        })
        .toBuffer();

      croppedImage = await sharp(croppedImage)
        .composite([{ input: logo, gravity: gravityMap[config.logoPosition] }])
        .toBuffer();
    }

    res.set("Content-Type", "image/png");
    res.status(200).send(croppedImage);
  }
);
