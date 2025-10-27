import { Router } from "express";
import upload from "../middlewares/multerMiddleware";
import {
  createConfig,
  updateConfig,
} from "../controllers/configurationController";
import { validateConfiguration } from "../middlewares/validateConfiguration";

const router = Router();

/**
 * @swagger
 * /config:
 *   post:
 *     operationId: createConfig
 *     tags:
 *       - configuration
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               scaleDown:
 *                 type: number
 *               logoPosition:
 *                 type: string
 *               logoImage:
 *                 type: string
 *                 format: binary
 *             required:
 *               - scaleDown
 *               - logoPosition
 *               - logoImage
 *     responses:
 *       201:
 *         description: Configuration created
 */
router.post(
  "/config",
  upload.single("logoImage"),
  validateConfiguration,
  createConfig
);

/**
 * @swagger
 * /config/{id}:
 *   put:
 *     operationId: updateConfig
 *     tags:
 *       - configuration
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               scaleDown:
 *                 type: number
 *               logoPosition:
 *                 type: string
 *               logoImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Configuration updated
 */
router.put(
  "/config/:id",
  upload.single("logoImage"),
  validateConfiguration,
  updateConfig
);

export default router;
