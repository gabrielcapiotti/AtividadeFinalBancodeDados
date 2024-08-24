import { Router } from "express";
import likeController from "../controllers/likes.controller";
import authMiddleware from '../middleware/auth.middleware';

const LikeRoutes = () => {
    const router = Router();
    const controller = new likeController();

    router.get("/:tweetId", authMiddleware, controller.listLikes);
    router.post("/", authMiddleware, controller.addLike);
    router.delete("/", authMiddleware, controller.removeLike);

    return router;
}

export default LikeRoutes;
