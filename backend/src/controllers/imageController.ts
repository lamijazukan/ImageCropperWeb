import sharp from "sharp";
import fs from "fs/promises";
import asyncHandler from "express-async-handler";
import { ImageCropRequest } from "../types/requests";
import { prisma } from "../prisma-client";
import { gravityMap } from "../utils/sharpGravityMapper";

// /preview
export const previewImage = asyncHandler(
  async (req: ImageCropRequest, res, next) => {
    const { x, y, width, height } = req.body.crop;
    const image = req.file!.path;

    const croppedImage = await sharp(image)
      .extract({
        left: x,
        top: y,
        width: width,
        height: height,
      })
      .resize({
        width: Math.floor(width * 0.05),
        height: Math.floor(height * 0.05),
      })
      .png()
      .toBuffer();

    await fs.unlink(image);

    res.type("image/png").send(croppedImage);
  }
);

// /generate

export const generateImage = asyncHandler(
  async (req: ImageCropRequest, res, next) => {
    const { x, y, width, height } = req.body.crop;
    const image = req.file!.path;

    let croppedImage = await sharp(image)
      .extract({
        left: x,
        top: y,
        width: width,
        height: height,
      })
      .png()
      .toBuffer();

    await fs.unlink(image);

    const { configId } = req.body;

    const config = configId
      ? await prisma.configuration.findUnique({ where: { id: configId } })
      : null;

    if (config?.logoImage) {
      const logo = await sharp(config.logoImage)
        .resize({
          width: Math.round(width * config.scaleDown),
          height: Math.round(height * config.scaleDown),
        })
        .toBuffer();

      croppedImage = await sharp(croppedImage)
        .composite([{ input: logo, gravity: gravityMap[config.logoPosition] }])
        .toBuffer();
    }

    res.type("image/png").send(croppedImage);
  }
);
