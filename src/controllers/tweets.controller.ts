import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TweetsController {
    public async index(req: Request, res: Response) {
        try {
            const tweets = await prisma.tweet.findMany({
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
        } catch (error) {
            console.error("Erro ao listar tweets:", error);
            return res
                .status(500)
                .json({ message: "Erro ao acessar os tweets." });
        }
    }

    public async create(req: Request, res: Response) {
        const { usuarioId, conteudo, tipo, tweetOriginalId } = req.body;
        try {
            const tweet = await prisma.tweet.create({
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
        } catch (error) {
            console.error("Erro ao criar tweet:", error);
            return res
                .status(500)
                .json({ message: "Erro ao criar tweet." });
        }
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const tweet = await prisma.tweet.findUnique({
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
        } catch (error) {
            console.error("Erro ao exibir tweet:", error);
            return res
                .status(500)
                .json({ message: "Erro ao exibir o tweet." });
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { conteudo } = req.body;
        try {
            const tweet = await prisma.tweet.update({
                where: { id },
                data: { conteudo }
            });
            return res
                .status(200)
                .json({ message: "Tweet atualizado com sucesso!", tweet });
        } catch (error) {
            console.error("Erro ao atualizar tweet:", error);
            return res
                .status(500)
                .json({ message: "Erro ao atualizar o tweet." });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await prisma.tweet.delete({
                where: { id }
            });
            return res
                .status(204)
                .json({ message: "Tweet deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar tweet:", error);
            return res
                .status(500)
                .json({ message: "Erro ao deletar o tweet." });
        }
    }
}

export default TweetsController;
