import { User } from "@prisma/client";
import { UserRepository } from "modules/user/domain/repositories/UserRepository";
import { IBcrypt } from "providers/bcrypt/bcrypt";

import { inject, injectable } from "tsyringe";
import { GenerateTokensService } from "./GenerateTokensService";

type Params = {
  email: string;
  password: string;
};

type Response = {
  token: string;
  user: User;
};

@injectable()
export class LoginUserService {
  constructor(
    @inject("UserRepository")
    private repository: UserRepository,
    private generateTokens: GenerateTokensService,
    @inject("bcrypt")
    private bcrypt: IBcrypt
  ) {}

  public async execute({ email, password }: Params): Promise<Response> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("Acessos incorretos");
    }
    const passwordMatch = await this.bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Acessos incorretos");
    }

    const { token } = await this.generateTokens.execute({
      user,
    });

    return {
      token,
      user,
    };
  }
}
