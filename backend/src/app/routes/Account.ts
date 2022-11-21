import { Router } from "express";
import { userController } from "../controller/User.controller";
import { auth } from "../middlewares/Auth";

const router: Router = Router();

router.get("/api/account/:id", auth, userController.LoadAccount);

export { router as accountRouter };
