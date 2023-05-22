import { Router } from "express";
import { userRouter } from "modules/user/routes/UserRouter";

const router = Router();

router.use("/user", userRouter);

export { router };
