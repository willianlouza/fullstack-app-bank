import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { accountRouter } from "./app/routes/Account";
import { transactionRouter } from "./app/routes/Transaction";
import { authRouter } from "./app/routes/Auth";

export class App {
  public server: express.Application;
  constructor() {
    this.server = express();
    this.middlewares();
    this.router();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
  }
  private router(): void {
    this.server.use(accountRouter);
    this.server.use(transactionRouter);
    this.server.use(authRouter);
  }
}
