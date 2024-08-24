import { NextFunction, Request, Response } from "express"
import db from "../database/prisma.connection";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res
            .status(401)
            .json({ success: false, msg: "Acesso negado. Nenhum token fornecido." });
    }

    try {
        const token = authHeader.split(' ')[1];
        const usuario = await db.usuario.findFirst({
            where: { token }
        });

        if (!usuario) {
            return res
                .status(401)
                .json({ success: false, msg: "Token inválido ou usuário não encontrado." });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.error("Erro no middleware de autenticação:", error);
        return res
            .status(500)
            .json({ success: false, msg: "Erro interno no servidor ao tentar autenticar." });
    }
}

export default authMiddleware;
