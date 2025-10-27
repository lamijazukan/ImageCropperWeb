import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, "../../uploads");
const logosDir = path.join(uploadDir, "logos");
const imagesDir = path.join(uploadDir, "images");

[uploadDir, logosDir, imagesDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    const folder = req.path.includes("config") ? logosDir : imagesDir;
    cb(null, folder);
  },
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_, file, cb) => {
  if (file.mimetype !== "image/png") {
    return cb(new Error("Only PNG files are allowed"));
  }
  cb(null, true);
};

export default multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});
