import { PrismaClient, User } from "@prisma/client";
import { IBcrypt } from "providers/bcrypt/bcrypt";

import { inject, injectable } from "tsyringe";

@injectable()
export class RegisterUserService {
  constructor(
    private repository: PrismaClient,
    @inject("bcrypt")
    private bcrypt: IBcrypt
  ) {}

  public async execute(user: User): Promise<User> {
    const userAlreadyExists = await this.repository.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    const passwordHash = await this.bcrypt.hash(user.password);

    return await this.repository.user.create({
      data: {
        email: user.email,
        password: passwordHash,
        name: user.name,
      },
    });
  }
}
