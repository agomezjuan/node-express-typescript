import { envs } from "./config";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  // todo: await for database

  // todo: await for server
  new Server({
    port: envs.PORT,
    routes: AppRouter.routes,
  }).start();
}
