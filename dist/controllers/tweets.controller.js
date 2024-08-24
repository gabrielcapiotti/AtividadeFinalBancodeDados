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
class TweetsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tweets = yield prisma.tweet.findMany({
                    include: {
                        usuario: true,
                        likes: true,
                        respostas: true,
                        repliesAsTweet: true,
                        tweetOriginal: true
                    }
                });
                return res
                    .status(200)
                    .json(tweets);
            }
            catch (error) {
                console.error("Erro ao listar tweets:", error);
                return res
                    .status(500)
                    .json({ message: "Erro ao acessar os tweets." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuarioId, conteudo, tipo, tweetOriginalId } = req.body;
            try {
                const tweet = yield prisma.tweet.create({
                    data: {
                        usuarioId,
                        conteudo,
                        tipo,
                        tweetOriginalId
                    }
                });
                return res
                    .status(201)
                    .json({ message: "Tweet criado com sucesso!", tweet });
            }
            catch (error) {
                console.error("Erro ao criar tweet:", error);
                return res
                    .status(500)
                    .json({ message: "Erro ao criar tweet." });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const tweet = yield prisma.tweet.findUnique({
                    where: { id },
                    include: {
                        usuario: true,
                        likes: true,
                        respostas: true,
                        repliesAsTweet: true,
                        tweetOriginal: true
                    }
                });
                if (!tweet) {
                    return res
                        .status(404)
                        .json({ message: "Tweet não encontrado." });
                }
                return res
                    .status(200)
                    .json(tweet);
            }
            catch (error) {
                console.error("Erro ao exibir tweet:", error);
                return res
                    .status(500)
                    .json({ message: "Erro ao exibir o tweet." });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { conteudo } = req.body;
            try {
                const tweet = yield prisma.tweet.update({
                    where: { id },
                    data: { conteudo }
                });
                return res
                    .status(200)
                    .json({ message: "Tweet atualizado com sucesso!", tweet });
            }
            catch (error) {
                console.error("Erro ao atualizar tweet:", error);
                return res
                    .status(500)
                    .json({ message: "Erro ao atualizar o tweet." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.tweet.delete({
                    where: { id }
                });
                return res
                    .status(204)
                    .json({ message: "Tweet deletado com sucesso!" });
            }
            catch (error) {
                console.error("Erro ao deletar tweet:", error);
                return res
                    .status(500)
                    .json({ message: "Erro ao deletar o tweet." });
            }
        });
    }
}
exports.default = TweetsController;
