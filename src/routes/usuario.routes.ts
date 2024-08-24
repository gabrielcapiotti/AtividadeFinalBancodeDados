import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";
import authMiddleware from "../middleware/auth.middleware";

const usuarioRoutes = () => {
    const router = Router();
    const controller = new UsuarioController();

    router.post("/register", controller.register);
    router.post("/login", controller.login);

    router.get("/", authMiddleware, controller.list);
    router.put("/:id", authMiddleware, controller.update);
    router.delete("/:id", authMiddleware, controller.delete);

    return router;
}

export default usuarioRoutes;
