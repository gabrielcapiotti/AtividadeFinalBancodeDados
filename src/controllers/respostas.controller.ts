import { Request, Response } from "express";
import db from "../database/prisma.connection";

class RespostasController {
    public async listarRespostas(req: Request, res: Response): Promise<Response> {
        try {
            const respostas = await db.reply.findMany();
            return res
                .status(200)
                .json({ success: true, data: respostas });
        } catch (error) {
            console.error("Erro ao listar respostas:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao listar respostas." });
        }
    }

    public async adicionarResposta(req: Request, res: Response): Promise<Response> {
        const { tweetId, resposta } = req.body;

        if (!tweetId || !resposta) {
            return res
                .status(400)
                .json({ success: false, msg: "ID do tweet e resposta são obrigatórios." });
        }

        try {
            const novaResposta = await db.reply.create({
                data: {
                    tweetId,
                    resposta
                }
            });
            return res
                .status(201)
                .json({ success: true, msg: "Resposta adicionada com sucesso.", data: novaResposta });
        } catch (error) {
            console.error("Erro ao adicionar resposta:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao adicionar resposta." });
        }
    }

    public async mostrarResposta(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const resposta = await db.reply.findUnique({
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
        } catch (error) {
            console.error("Erro ao mostrar resposta:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao mostrar resposta." });
        }
    }

    public async atualizarResposta(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { resposta } = req.body;

        try {
            const respostaExistente = await db.reply.findUnique({
                where: { id }
            });

            if (!respostaExistente) {
                return res
                    .status(404)
                    .json({ success: false, msg: "Resposta não encontrada." });
            }

            const respostaAtualizada = await db.reply.update({
                where: { id },
                data: { resposta }
            });

            return res
                .status(200)
                .json({ success: true, msg: "Resposta atualizada com sucesso.", data: respostaAtualizada });
        } catch (error) {
            console.error("Erro ao atualizar resposta:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao atualizar resposta." });
        }
    }

    public async deletarResposta(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const resposta = await db.reply.delete({
                where: { id }
            });

            return res
                .status(204)
                .json({ success: true, msg: "Resposta deletada com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar resposta:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao deletar resposta." });
        }
    }
}

export default RespostasController;
