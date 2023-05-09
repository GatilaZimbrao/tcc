import { Router } from "express";
import { UserController } from "../application/controller/UserController";

const userRouter = Router();
const controller = new UserController();

userRouter.post("/", controller.create);

export { userRouter };
