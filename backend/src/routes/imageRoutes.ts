import { Router } from "express";
import upload from "../middlewares/multerMiddleware";
import { validateCrop } from "../middlewares/validateCropMiddleware";
import { previewImage, generateImage } from "../controllers/imageController";

const router = Router();
/**
 * @swagger
 * /image/preview:
 *   post:
 *     operationId: preview
 *     tags:
 *       - image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - crop
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: HD PNG image file
 *               crop:
 *                 type: object
 *                 description: Crop coordinates
 *                 properties:
 *                   x: { type: number }
 *                   y: { type: number }
 *                   width: { type: number }
 *                   height: { type: number }
 *     responses:
 *       200:
 *         description: Cropped image preview in PNG format scaled to 5%
 */
router.post(
  "/image/preview",
  upload.single("image"),
  validateCrop,
  previewImage
);

/**
 * @swagger
 * /image/generate:
 *   post:
 *     operationId: generate
 *     tags:
 *       - image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - crop
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: HD PNG image file
 *               crop:
 *                 type: object
 *                 description: Crop coordinates
 *                 properties:
 *                   x: { type: number }
 *                   y: { type: number }
 *                   width: { type: number }
 *                   height: { type: number }
 *               configId:
 *                 type: string
 *                 description: Optional ID of logo configuration to apply
 *     responses:
 *       200:
 *         description: Cropped image preview in PNG format
 */

router.post(
  "/image/generate",
  upload.single("image"),
  validateCrop,
  generateImage
);

export default router;
