import { Request, Response } from "express";
import db from "../database/prisma.connection";

class SeguidoresController {
    public async seguir(req: Request, res: Response) {
        const { followingId } = req.body;
        const followerId = req.usuario?.id;

        if (!followerId || !followingId) {
            return res
                .status(400)
                .json({ success: false, msg: "Os IDs de seguidor e seguido são obrigatórios." });
        }

        if (followerId === followingId) {
            return res
                .status(400)
                .json({ success: false, msg: "Um usuário não pode seguir a si mesmo." });
        }

        try {
            const follow = await db.follower.create({
                data: {
                    followerId,
                    followingId
                }
            });
            return res
                .status(201)
                .json({ success: true, msg: "Usuário seguido com sucesso.", data: follow });
        } catch (error) {
            console.error("Erro ao seguir usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao tentar seguir o usuário." });
        }
    }

    public async deixarDeSeguir(req: Request, res: Response) {
        const { followingId } = req.params;
        const followerId = req.usuario?.id;

        try {
            await db.follower.deleteMany({
                where: {
                    followerId,
                    followingId
                }
            });
            return res
                .status(204)
                .json({ success: true, msg: "Usuário deixado de seguir com sucesso." });
        } catch (error) {
            console.error("Erro ao deixar de seguir usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao tentar deixar de seguir o usuário." });
        }
    }

    public async listarSeguidores(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params;
        try {
            const followers = await db.follower.findMany({
                where: {
                    followingId: userId
                },
                include: {
                    follower: true
                }
            });
            return res
                .status(200)
                .json({ success: true, data: followers.map(f => f.follower) });
        } catch (error) {
            console.error("Erro ao listar seguidores:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao listar seguidores." });
        }
    }

    public async listarSeguindo(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params;
        try {
            const following = await db.follower.findMany({
                where: {
                    followerId: userId
                },
                include: {
                    following: true
                }
            });
            return res
                .status(200)
                .json({ success: true, data: following.map(f => f.following) });
        } catch (error) {
            console.error("Erro ao listar seguindo:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao listar seguindo." });
        }
    }
}

export default SeguidoresController;
