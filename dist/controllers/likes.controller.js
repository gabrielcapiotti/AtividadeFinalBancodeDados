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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class LikesController {
    addLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuarioId, tweetId } = req.body;
            try {
                const existeLike = yield prisma.like.findFirst({
                    where: {
                        usuarioId,
                        tweetId
                    }
                });
                if (existeLike) {
                    return res
                        .status(400)
                        .json({ success: false, msg: "Você já curtiu este tweet!" });
                }
                const novoLike = yield prisma.like.create({
                    data: {
                        usuarioId,
                        tweetId
                    }
                });
                return res
                    .status(201)
                    .json({ success: true, msg: "Like adicionado com sucesso!", data: novoLike });
            }
            catch (error) {
                console.error("Erro ao adicionar like:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao adicionar like." });
            }
        });
    }
    removeLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuarioId, tweetId } = req.body;
            try {
                const like = yield prisma.like.deleteMany({
                    where: {
                        usuarioId,
                        tweetId
                    }
                });
                if (like.count === 0) {
                    return res
                        .status(404)
                        .json({ success: false, msg: "Like não encontrado ou já removido." });
                }
                return res
                    .status(200)
                    .json({ success: true, msg: "Like removido com sucesso!" });
            }
            catch (error) {
                console.error("Erro ao remover like:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao remover like." });
            }
        });
    }
    listLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tweetId } = req.params;
            try {
                const likes = yield prisma.like.findMany({
                    where: {
                        tweetId
                    },
                    include: {
                        usuario: true
                    }
                });
                return res
                    .status(200)
                    .json({ success: true, data: likes });
            }
            catch (error) {
                console.error("Erro ao listar likes:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao listar likes." });
            }
        });
    }
}
exports.default = LikesController;
