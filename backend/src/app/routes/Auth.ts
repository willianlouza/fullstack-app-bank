import { Router } from "express";
import { userController }  from "../controller/User.controller";
import { auth } from "../middlewares/Auth";

const router: Router = Router();

router.post("/api/auth/register", userController.Register);
router.post("/api/auth/login", userController.Login);

export { router as authRouter};
