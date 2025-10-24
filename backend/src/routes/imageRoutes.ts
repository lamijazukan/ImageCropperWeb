import { Router } from "express";
import upload from "../middlewares/multerMiddleware";
import { validateCrop } from "../middlewares/validateCropMiddleware";
import { previewImage } from "../controllers/imageController";

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
 */
router.post(
  "/image/preview",
  upload.single("image"),
  validateCrop,
  previewImage
);

export default router;
