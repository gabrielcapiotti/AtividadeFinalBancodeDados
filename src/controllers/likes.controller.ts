import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class LikesController {
    public async addLike(req: Request, res: Response) {
        const { usuarioId, tweetId } = req.body;

        try {
            const existeLike = await prisma.like.findFirst({
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

            const novoLike = await prisma.like.create({
                data: {
                    usuarioId,
                    tweetId
                }
            });

            return res
                .status(201)
                .json({ success: true, msg: "Like adicionado com sucesso!", data: novoLike });
        } catch (error) {
            console.error("Erro ao adicionar like:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao adicionar like." });
        }
    }

    public async removeLike(req: Request, res: Response) {
        const { usuarioId, tweetId } = req.body;

        try {
            const like = await prisma.like.deleteMany({
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
        } catch (error) {
            console.error("Erro ao remover like:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao remover like." });
        }
    }

    public async listLikes(req: Request, res: Response) {
        const { tweetId } = req.params;

        try {
            const likes = await prisma.like.findMany({
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
        } catch (error) {
            console.error("Erro ao listar likes:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao listar likes." });
        }
    }
}

export default LikesController;
