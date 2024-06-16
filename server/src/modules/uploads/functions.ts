import { Request, Response } from "express";
import { serverError } from "../../utils/functions";
import { uploadsDir } from "./routes";
import fs from "fs";
import path from "path";

export async function uploadImage(req: Request, res: Response) {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({
        error: true,
        message: "No files were uploaded.",
      });
    }

    const uploadedFiles = (req.files as Express.Multer.File[]).map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    res.status(200).json({
      error: false,
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });
  } catch (error) {
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

    const imageUrls = imageFiles.map((file) => `http://localhost:5000/uploads/${file}`);

    res.status(200).json(imageUrls);
  } catch (error) {
    serverError({ error, res });
  }
}
