"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seguidores_controller_1 = __importDefault(require("../controllers/seguidores.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const seguidoresRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new seguidores_controller_1.default();
    router.post('/seguir', auth_middleware_1.default, controller.seguir);
    router.delete('/deixarDeSeguir/:followingId', auth_middleware_1.default, controller.deixarDeSeguir);
    router.get('/seguidores/:userId', auth_middleware_1.default, controller.listarSeguidores);
    router.get('/seguindo/:userId', auth_middleware_1.default, controller.listarSeguindo);
    return router;
};
exports.default = seguidoresRoutes;
