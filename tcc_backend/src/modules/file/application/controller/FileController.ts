import "reflect-metadata";

import { Request, Response } from "express";

import { container } from "tsyringe";

import {
  FileError,
  FileErrorStatus,
} from "modules/file/shared/error/FileError";
import { CreateFileService } from "../services/CreateFileService";
import { DeleteFileService } from "../services/DeleteFileService";
import { ListFileService } from "../services/ListFileService";
import { FindByIdFileService } from "../services/FindByIdFileService";
import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";

export class FileController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, type } = req.body;
    let file_name = "";
    let uploadedFile: UploadedFile | undefined;

    if (!name || !type) {
      throw new FileError(FileErrorStatus.MISSING_PARAMS);
    }

    const files = req.files as FileArray;

    Object.keys(files).forEach((key) => {
      if (!Array.isArray(files[key])) {
        uploadedFile = files[key] as UploadedFile;

        file_name = uploadedFile.name;
      }
    });
    const createService = container.resolve(CreateFileService);

    if (!file_name || !uploadedFile) {
      throw new FileError(FileErrorStatus.MISSING_PARAMS);
    }

    const file = await createService.execute(
      {
        id: 0,
        name: name,
        type: type,
        file_name: file_name,
      },
      uploadedFile
    );

    res.status(201).json({
      id: file?.id,
      name: file?.name,
      type: file?.type,
      file_name: file?.file_name,
    });

    // return res.json({
    //   status: "success",
    //   message: Object.keys(files).toString(),
    // });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      throw new FileError(FileErrorStatus.MISSING_PARAMS);
    }

    const deleteService = container.resolve(DeleteFileService);

    await deleteService.execute(Number(id));

    res.status(200).json({
      message: "Arquivo removido com sucesso",
    });
  }

  async list(req: Request, res: Response): Promise<void> {
    const listService = container.resolve(ListFileService);

    const fileList = await listService.execute();

    res.status(200).json(fileList);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      throw new FileError(FileErrorStatus.MISSING_PARAMS);
    }

    const findByIdFileService = container.resolve(FindByIdFileService);

    const file = await findByIdFileService.execute(Number(id));

    if (!file) {
      throw new FileError(FileErrorStatus.FILE_DONT_EXISTS);
    }

    res
      .status(200)
      .sendFile(
        path.join(__dirname, "../", "../", "archives", `${file?.file_name}`)
      );
  }
}
