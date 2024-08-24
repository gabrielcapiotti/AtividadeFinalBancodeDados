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
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res
                    .status(400)
                    .json({ success: false, msg: "É necessário completar todos os campos." });
            }
            const encontrarUsuario = yield prisma_connection_1.default.usuario.findUnique({
                where: { email },
            });
            if (!encontrarUsuario || !bcrypt_1.default.compareSync(senha, encontrarUsuario.senha)) {
                return res
                    .status(401)
                    .json({ success: false, msg: "Email ou senha incorretos!" });
            }
            return res
                .status(200)
                .json({ success: true, msg: "Usuário autenticado com sucesso!" });
        });
    }
}
exports.default = AuthController;
