"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likes_controller_1 = __importDefault(require("../controllers/likes.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const LikeRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new likes_controller_1.default();
    router.get("/:tweetId", auth_middleware_1.default, controller.listLikes);
    router.post("/", auth_middleware_1.default, controller.addLike);
    router.delete("/", auth_middleware_1.default, controller.removeLike);
    return router;
};
exports.default = LikeRoutes;
