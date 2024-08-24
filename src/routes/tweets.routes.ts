import { Router } from "express";
import TweetsController from "../controllers/tweets.controller";
import authMiddleware from "../middleware/auth.middleware";

const TweetsRoutes = () => {
    const router = Router();
    const controller = new TweetsController();

    router.get("/", authMiddleware, controller.index);
    router.post("/", authMiddleware, controller.create);
    router.put("/:id", authMiddleware, controller.update);
    router.delete("/:id", authMiddleware, controller.delete);

    return router;
}

export default TweetsRoutes;
