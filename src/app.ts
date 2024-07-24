import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  console.log("Hello world");

  // todo: await for database

  // todo: await for server
  new Server({ port: 3000 }).start();
}
