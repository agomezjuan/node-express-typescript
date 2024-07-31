import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  User,
} from "../../domain";

export class AuthDataSourceImpl implements AuthDataSource {
  registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. Create a new user

      // 2. Save the user in the database
      // 3. Return the user
      return Promise.resolve(
        new User("1", name, email, password, ["user"], undefined)
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        500,
        "An error occurred while registering the user"
      );
    }
  }
}
