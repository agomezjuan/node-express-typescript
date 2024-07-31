import { AuthDataSource, RegisterUserDto, User } from "../../domain";

export abstract class AuthRepository implements AuthDataSource {
  abstract registerUser(user: RegisterUserDto): Promise<User>;
  /* 
  todo: implementar
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract findUserById(id: string): Promise<User | null>;
  abstract findUserByUsername(username: string): Promise<User | null>;
  abstract findUserByResetToken(token: string): Promise<User | null>;
  abstract updateUser(user: User): Promise<User>;
  abstract updatePassword(user: User): Promise<User>;
  abstract updateResetToken(user: User): Promise<User>;
  abstract updateVerificationToken(user: User): Promise<User>;
  abstract deleteUser(id: string): Promise<void>;
    */
}
