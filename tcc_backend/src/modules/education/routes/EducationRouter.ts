import { Router } from "express";
import { UserController } from "../application/controller/UserController";

const educationRouter = Router();
const controller = new UserController();

educationRouter.post("/", controller.create);

export { educationRouter };
