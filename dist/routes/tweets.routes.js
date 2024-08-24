"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweets_controller_1 = __importDefault(require("../controllers/tweets.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const TweetsRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new tweets_controller_1.default();
    router.get("/", auth_middleware_1.default, controller.index);
    router.post("/", auth_middleware_1.default, controller.create);
    router.put("/:id", auth_middleware_1.default, controller.update);
    router.delete("/:id", auth_middleware_1.default, controller.delete);
    return router;
};
exports.default = TweetsRoutes;
