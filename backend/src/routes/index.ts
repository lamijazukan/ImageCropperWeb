import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a simple message to test the API
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get("/", (req, res) => {
  res.send("Welcome to the Image Cropper home page!!");
});

export default router;
