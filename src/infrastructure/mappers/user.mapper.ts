import { User } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, id, name, email, password, roles = ["USER_ROLE"] } = object;

    if (!_id || !id) throw new Error("Missing id property");
    if (!name) throw new Error("Missing name property");
    if (!email) throw new Error("Missing email property");
    if (!password) throw new Error("Missing password property");

    return new User(_id || id, name, email, password, roles);
  }
}
