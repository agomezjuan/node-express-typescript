import {
  AuthRepository,
  RegisterUserDto,
  User,
  AuthDataSource,
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}
  registerUser(user: RegisterUserDto): Promise<User> {
    return this.authDataSource.registerUser(user);
  }
}
