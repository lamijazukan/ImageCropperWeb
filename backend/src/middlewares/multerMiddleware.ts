import multer from "multer";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/AppError";

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_, file, cb) => {
  if (file.mimetype !== "image/png") {
    return cb(new AppError("Only PNG files are allowed"));
  }
  cb(null, true);
};

export default multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});
