import { NextFunction, Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";
import { FileError, FileErrorStatus } from "../shared/error/FileError";
import { FILE_ALLOWED_EXT } from "../config/config";

export const filesExtLimiter = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as FileArray;

    const fileExtensions: String[] = [];

    Object.keys(files).forEach((key) => {
      if (!Array.isArray(files[key])) {
        const uploadedFile: UploadedFile = files[key] as UploadedFile;

        fileExtensions.push(path.extname(uploadedFile.name));
      }
    });

    const allowed = fileExtensions.every((ext) =>
      FILE_ALLOWED_EXT.includes(ext)
    );

    if (!allowed) {
      throw new FileError(FileErrorStatus.WRONG_FILE_EXT);
    }

    next();
  };
};
