import { Router } from "express";
import { UserController } from "../application/controller/UserController";

const userRouter = Router();
const controller = new UserController();

userRouter.post("/login", controller.login);

// userRouter.delete("/:id", controller.delete);
// userRouter.get("/find/:id", controller.findById);
// userRouter.get("/", controller.list);
userRouter.post("/", controller.create);

export { userRouter };
