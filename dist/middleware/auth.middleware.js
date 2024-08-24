"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_connection_1 = __importDefault(require("../database/prisma.connection"));
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ success: false, msg: "Acesso negado. Nenhum token fornecido." });
        }
        try {
            const token = authHeader.split(' ')[1];
            const usuario = yield prisma_connection_1.default.usuario.findFirst({
                where: { token }
            });
            if (!usuario) {
                return res
                    .status(401)
                    .json({ success: false, msg: "Token inválido ou usuário não encontrado." });
            }
            req.usuario = usuario;
            next();
        }
        catch (error) {
            console.error("Erro no middleware de autenticação:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno no servidor ao tentar autenticar." });
        }
    });
}
exports.default = authMiddleware;
