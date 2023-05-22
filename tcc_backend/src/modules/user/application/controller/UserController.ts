import "reflect-metadata";

import { Request, Response } from "express";
// import { prismaClient } from "infra/prisma";

import { container } from "tsyringe";
import { LoginUserService } from "../services/LoginUserService";
import { removeFields } from "@shared/utils/removeFields";
import { RegisterUserService } from "../services/RegisterUserService";

export class UserController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const loginService = container.resolve(LoginUserService);

    const response = await loginService.execute({
      email,
      password,
    });

    const parsed = removeFields({ ...response.user }, ["password"]);

    res.status(200).json({
      token: response.token,
      user: parsed,
    });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      res.status(400).json({
        message: "Parâmetros inválidos",
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        message: "As senhas devem ser iguais",
      });
      return;
    }
    try {
      const registerService = container.resolve(RegisterUserService);

      const user = await registerService.execute({
        id: 0,
        email: email,
        name: name,
        password: password,
      });

      res.status(201).json({
        id: user?.id,
        email: user?.email,
        name: user?.name,
      });
      return;
    } catch (error) {
      res.status(400).json();
      return;
    }
  }

  // async list(req: Request, res: Response): Promise<void> {
  //   try {
  //     const users = await prismaClient.user.findMany({});
  //     res.status(200).json(users);
  //     return;
  //   } catch (error) {
  //     res.status(400).json();
  //     return;
  //   }
  // }
  // async findById(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;

  //   if (!id || Number.isNaN(Number(id))) {
  //     res.status(400).json({
  //       message: "Parâmetros inválidos",
  //     });
  //     return;
  //   }

  //   try {
  //     const user = await prismaClient.user.findUnique({
  //       where: {
  //         id: Number(id),
  //       },
  //     });
  //     res.status(200).json(user);
  //     return;
  //   } catch (error) {
  //     res.status(400).json();
  //     return;
  //   }
  // }

  // async delete(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;

  //   if (!id || Number.isNaN(Number(id))) {
  //     res.status(400).json({
  //       message: "Parâmetros inválidos",
  //     });
  //     return;
  //   }

  //   try {
  //     const user = await prismaClient.user.delete({
  //       where: {
  //         id: Number(id),
  //       },
  //     });
  //     res.status(200).json({
  //       message: `Usuario ${user.name} deletado com sucesso`,
  //     });
  //     return;
  //   } catch (error) {
  //     res.status(400).json();
  //     return;
  //   }
  // }
}
