import { filesExtLimiter } from "@shared/middlewares/filesExtLimiter";
import { filesPayloadExists } from "@shared/middlewares/filesPayloadExists";
import { filesSizeLimiter } from "@shared/middlewares/filesSizeLimiter";
import { Router } from "express";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import { authRouter } from "modules/auth/routes/AuthRouter";
import { userRouter } from "modules/user/routes/UserRouter";
import path from "path";

const router = Router();

router.get("/", (req, res) => {
  // console.log(req.file);
  res.send("Server online!");
});

router.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.get("/download", (req, res) => {
  const { name } = req.query;

  console.log("name", name);

  if (!name) {
    res.send("Error");
  }
  res.sendFile(path.join(__dirname, "files", `${name}`));
});

router.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  filesExtLimiter([".pdf", ".png", ".jpg", ".jpeg"]),
  filesSizeLimiter,
  (req, res) => {
    const files = req.files as FileArray;
    console.log("Files");
    console.log(files);

    Object.keys(files).forEach((key) => {
      if (!Array.isArray(files[key])) {
        const uploadedFile: UploadedFile = files[key] as UploadedFile;

        const filePath = path.join(__dirname, "files", uploadedFile.name);

        uploadedFile.mv(filePath, (err: Error) => {
          if (err) {
            return res.status(500).json({ status: "error", message: err });
          }
        });
      }
    });

    return res.json({
      status: "success",
      message: Object.keys(files).toString(),
    });
  }
);

router.use("/auth", authRouter);
router.use("/user", userRouter);

export { router };
