import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const AuthRoutes = () => {
    const router = Router();
    const controller = new AuthController();

    router.post("/register", controller.register);

    return router;
}

export default AuthRoutes;
