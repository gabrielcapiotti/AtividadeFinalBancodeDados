"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const respostas_controller_1 = __importDefault(require("../controllers/respostas.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const respostasRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new respostas_controller_1.default();
    router.get('/', auth_middleware_1.default, controller.listarRespostas);
    router.post('/', auth_middleware_1.default, controller.adicionarResposta);
    router.get('/:id', auth_middleware_1.default, controller.mostrarResposta);
    router.put('/:id', auth_middleware_1.default, controller.atualizarResposta);
    router.delete('/:id', auth_middleware_1.default, controller.deletarResposta);
    return router;
};
exports.default = respostasRoutes;
