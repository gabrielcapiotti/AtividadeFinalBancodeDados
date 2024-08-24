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
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const prisma = new client_1.PrismaClient();
class UsuarioController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha, nome } = req.body;
            if (!email || !senha || !nome) {
                return res
                    .status(400)
                    .json({ success: false, msg: "Todos os campos são obrigatórios." });
            }
            try {
                const hashedPassword = bcrypt_1.default.hashSync(senha, 8);
                const novoUsuario = yield prisma.usuario.create({
                    data: {
                        email,
                        senha: hashedPassword,
                        nome,
                    }
                });
                return res
                    .status(201)
                    .json({ success: true, msg: "Usuário registrado com sucesso!", data: novoUsuario });
            }
            catch (error) {
                console.error("Erro ao registrar usuário:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao registrar usuário." });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            try {
                const usuario = yield prisma.usuario.findUnique({
                    where: { email }
                });
                if (!usuario || !bcrypt_1.default.compareSync(senha, usuario.senha)) {
                    return res
                        .status(401)
                        .json({ success: false, msg: "Email ou senha incorretos!" });
                }
                return res
                    .status(200)
                    .json({ success: true, msg: "Login realizado com sucesso!" });
            }
            catch (error) {
                console.error("Erro ao logar usuário:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao logar usuário." });
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, auth_middleware_1.default)(req, res, next);
            try {
                const usuarios = yield prisma.usuario.findMany();
                return res
                    .status(200)
                    .json({ success: true, data: usuarios });
            }
            catch (error) {
                console.error("Erro ao listar usuários:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro ao listar usuários." });
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, auth_middleware_1.default)(req, res, next);
            const { id } = req.params;
            const { nome, email, senha } = req.body;
            try {
                const usuarioExistente = yield prisma.usuario.findUnique({
                    where: { id }
                });
                if (!usuarioExistente) {
                    return res
                        .status(404)
                        .json({ success: false, msg: "Usuário não encontrado." });
                }
                const hashedPassword = senha ? bcrypt_1.default.hashSync(senha, 8) : usuarioExistente.senha;
                const updatedUser = yield prisma.usuario.update({
                    where: { id },
                    data: {
                        email: email || usuarioExistente.email,
                        senha: hashedPassword
                    }
                });
                return res
                    .status(200)
                    .json({ success: true, msg: "Usuário atualizado com sucesso!", data: updatedUser });
            }
            catch (error) {
                console.error("Erro ao atualizar usuário:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao atualizar usuário." });
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, auth_middleware_1.default)(req, res, next);
            const { id } = req.params;
            try {
                yield prisma.usuario.delete({
                    where: { id }
                });
                return res
                    .status(204)
                    .json({ success: true, msg: "Usuário deletado com sucesso." });
            }
            catch (error) {
                console.error("Erro ao deletar usuário:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Falha ao deletar usuário." });
            }
        });
    }
}
exports.default = UsuarioController;
