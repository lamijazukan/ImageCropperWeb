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

    const imageMetadata = await sharp(image).metadata();

    const croppedImage = await sharp(image)
      .extract({
        left: Math.floor(x),
        top: Math.floor(y),
        width: Math.floor(width),
        height: Math.floor(height),
      })
      .resize({
        width: Math.floor(imageMetadata.width * 0.05),
        height: Math.floor(imageMetadata.height * 0.05),
        fit: "fill",
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
      const logoWidth = Math.round(width * config.scaleDown);
      const logoHeight = Math.round(height * config.scaleDown);

      const logo = await sharp(config.logoImage)
        .resize({
          width: logoWidth,
          height: logoHeight,
          fit: "inside",
        })
        .toBuffer();

      const gravity = gravityMap[config.logoPosition];

      croppedImage = await sharp(croppedImage)
        .composite([
          {
            input: logo,
            gravity: gravity,
            left: 10,
            top: 10,
          },
        ])
        .png()
        .toBuffer();
    }

    res.type("image/png").send(croppedImage);
  }
);
