import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb/mongo-database";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  // todo: await for database
  await MongoDatabase.connect({
    mongoURI: envs.MONGO_URI,
    dbName: envs.MONGO_DB_NAME,
  });

  // todo: await for server
  new Server({
    port: envs.PORT,
    routes: AppRouter.routes,
  }).start();
}
