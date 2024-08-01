import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  User,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPaswword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. Check for existing user
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest("User already exists");

      // 2. Save the user in the database
      const user = await UserModel.create({
        name,
        email,
        password: this.hashPaswword(password),
      });
      if (!user) throw CustomError.internal();

      user.save();

      // 3. Return the user
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internal(
        "An error occurred while registering the user"
      );
    }
  }
}
