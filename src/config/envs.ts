import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MONGO_URI: get("MONGO_URI").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
};
