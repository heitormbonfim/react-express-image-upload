import express from "express";
import { getImages, uploadImage } from "./functions";
import multer from "multer";
import path from "path";
import fs from "fs";

export const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadsRouter = express.Router();

uploadsRouter.post("/uploads", upload.array("images", 10), uploadImage);
uploadsRouter.get("/uploads", getImages);
