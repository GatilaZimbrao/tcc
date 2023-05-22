import { User } from "@prisma/client";
import { UserRepository } from "modules/user/domain/repositories/UserRepository";
import { IBcrypt } from "providers/bcrypt/bcrypt";

import { inject, injectable } from "tsyringe";

@injectable()
export class RegisterUserService {
  constructor(
    @inject("UserRepository")
    private repository: UserRepository,
    @inject("bcrypt")
    private bcrypt: IBcrypt
  ) {}

  public async execute(user: User): Promise<User | null> {
    const userAlreadyExists = await this.repository.findByEmail(user.email);

    console.log("ASDSDASD");
    console.log("userAlreadyExists", userAlreadyExists);
    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    console.log("DDD");
    const passwordHash = await this.bcrypt.hash(user.password);

    return await this.repository.create({
      id: user.id,
      email: user.email,
      name: user.name,
      password: passwordHash,
    });
  }
}
