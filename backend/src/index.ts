import { App } from "./app";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8080;

new App().server.listen(port, async () => {
  console.log("Server running!");
});
