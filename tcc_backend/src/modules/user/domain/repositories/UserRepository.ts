// import { UserModel } from "modules/auth/domain/models/UserModel";
import { User } from "@prisma/client";
// import { Create } from "typings/helpers";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User | null>;
}
