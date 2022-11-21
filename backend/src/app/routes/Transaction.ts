import { Router } from "express";
import { userController } from "../controller/User.controller";
import { transactionController } from "../controller/Transaction.controller";
import { auth } from "../middlewares/Auth";

const router: Router = Router();
router.post("/api/transaction/:id", auth, transactionController.MakeTransaction);
router.get("/api/transaction/find/:id", auth, transactionController.GetTransaction);
export { router as transactionRouter };
