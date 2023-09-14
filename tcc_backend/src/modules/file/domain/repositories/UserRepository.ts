import { User } from "@prisma/client";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User | null>;

  findById(id: number): Promise<User | null>;
  delete(id: number): Promise<null>;
  create(user: User): Promise<User | null>;
}
