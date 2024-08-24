"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("../controllers/usuario.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const usuarioRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new usuario_controller_1.default();
    router.post("/register", controller.register);
    router.post("/login", controller.login);
    router.get("/", auth_middleware_1.default, controller.list);
    router.put("/:id", auth_middleware_1.default, controller.update);
    router.delete("/:id", auth_middleware_1.default, controller.delete);
    return router;
};
exports.default = usuarioRoutes;
