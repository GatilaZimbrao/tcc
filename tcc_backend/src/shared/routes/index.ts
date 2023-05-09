import { Router } from "express";
import { userRouter } from "modules/user/routes/UserRouter";

const router = Router();

router.use("/user", userRouter);

router.get("/", (req, res) => {
  res.send("Server online!");
});

export { router };
