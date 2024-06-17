import express from "express";
import multer from "multer";
import path from "path";
import { getImages, uploadImage } from "./functions";
import fs from "fs";

export const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadsRouter = express.Router();

uploadsRouter.post("/uploads", upload.array("images", 10), uploadImage);
uploadsRouter.get("/uploads", getImages);
