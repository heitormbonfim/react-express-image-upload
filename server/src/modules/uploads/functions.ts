import { Request, Response } from "express";
import { uploadsDir } from "./routes";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import crypt from "node:crypto";
import { serverError } from "../../utils/functions";

const defaultImageWidthSize = 448;

export async function uploadImage(req: Request, res: Response) {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({
        error: true,
        message: "No files were uploaded.",
      });
    }

    const uploadedFiles = (req.files as Express.Multer.File[]).map(async (file) => {
      const filename = `${crypt.randomUUID()}-${file.originalname}`;
      const finalFilePath = path.join(uploadsDir, filename);

      // Resize the image using sharp
      await sharp(file.buffer).resize({ width: defaultImageWidthSize }).toFile(finalFilePath);

      return {
        filename,
        path: finalFilePath,
      };
    });

    const resolvedFiles = await Promise.all(uploadedFiles);

    res.status(200).json({
      error: false,
      message: "Files uploaded and resized successfully",
      files: resolvedFiles,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    serverError({ error, res });
  }
}

export async function getImages(_req: Request, res: Response) {
  try {
    const files = await fs.promises.readdir(uploadsDir);

    const imageFiles = files.filter((file) => {
      const fileExtension = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif"].includes(fileExtension);
    });

    if (imageFiles.length === 0) {
      return res.status(200).json({
        error: false,
        message: "No images were uploaded",
      });
    }

    const imageUrls = imageFiles.map((file) => `/uploads/${file}`);

    res.status(200).json({
      error: false,
      message: "Images uploaded",
      data: imageUrls,
    });
  } catch (error) {
    serverError({ error, res });
  }
}
