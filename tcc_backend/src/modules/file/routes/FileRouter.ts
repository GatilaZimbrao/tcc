import { Router } from "express";
import { FileController } from "../application/controller/FileController";
import fileUpload from "express-fileupload";
import { filesPayloadExists } from "../middlewares/filesPayloadExists";
import { filesExtLimiter } from "../middlewares/filesExtLimiter";
import { filesSizeLimiter } from "../middlewares/filesSizeLimiter";

const fileRouter = Router();
const controller = new FileController();

fileRouter.post(
  "/create",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  filesExtLimiter,
  filesSizeLimiter,
  controller.create
);

fileRouter.delete("/delete/:id", controller.delete);
fileRouter.get("/find/:id", controller.findById);
fileRouter.get("/list", controller.list);

export { fileRouter };
