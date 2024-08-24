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
class RespostasController {
    listarRespostas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respostas = yield prisma_connection_1.default.reply.findMany();
                return res
                    .status(200)
                    .json({ success: true, data: respostas });
            }
            catch (error) {
                console.error("Erro ao listar respostas:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao listar respostas." });
            }
        });
    }
    adicionarResposta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tweetId, resposta } = req.body;
            if (!tweetId || !resposta) {
                return res
                    .status(400)
                    .json({ success: false, msg: "ID do tweet e resposta são obrigatórios." });
            }
            try {
                const novaResposta = yield prisma_connection_1.default.reply.create({
                    data: {
                        tweetId,
                        resposta
                    }
                });
                return res
                    .status(201)
                    .json({ success: true, msg: "Resposta adicionada com sucesso.", data: novaResposta });
            }
            catch (error) {
                console.error("Erro ao adicionar resposta:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao adicionar resposta." });
            }
        });
    }
    mostrarResposta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const resposta = yield prisma_connection_1.default.reply.findUnique({
                    where: { id }
                });
                if (!resposta) {
                    return res
                        .status(404)
                        .json({ success: false, msg: "Resposta não encontrada." });
                }
                return res
                    .status(200)
                    .json({ success: true, data: resposta });
            }
            catch (error) {
                console.error("Erro ao mostrar resposta:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao mostrar resposta." });
            }
        });
    }
    atualizarResposta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { resposta } = req.body;
            try {
                const respostaExistente = yield prisma_connection_1.default.reply.findUnique({
                    where: { id }
                });
                if (!respostaExistente) {
                    return res
                        .status(404)
                        .json({ success: false, msg: "Resposta não encontrada." });
                }
                const respostaAtualizada = yield prisma_connection_1.default.reply.update({
                    where: { id },
                    data: { resposta }
                });
                return res
                    .status(200)
                    .json({ success: true, msg: "Resposta atualizada com sucesso.", data: respostaAtualizada });
            }
            catch (error) {
                console.error("Erro ao atualizar resposta:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao atualizar resposta." });
            }
        });
    }
    deletarResposta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const resposta = yield prisma_connection_1.default.reply.delete({
                    where: { id }
                });
                return res
                    .status(204)
                    .json({ success: true, msg: "Resposta deletada com sucesso." });
            }
            catch (error) {
                console.error("Erro ao deletar resposta:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao deletar resposta." });
            }
        });
    }
}
exports.default = RespostasController;
