import { Request, Response } from "express";
import db from "../database/prisma.connection";
import bcrypt from "bcrypt";

class AuthController {
    public async register(req: Request, res: Response) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res
                .status(400)
                .json({ success: false, msg: "É necessário completar todos os campos." });
        }

        const encontrarUsuario = await db.usuario.findUnique({
            where: { email },
        });

        if (!encontrarUsuario || !bcrypt.compareSync(senha, encontrarUsuario.senha)) {
            return res
                .status(401)
                .json({ success: false, msg: "Email ou senha incorretos!" });
        }


        return res
            .status(200)
            .json({ success: true, msg: "Usuário autenticado com sucesso!" });
    }
}

export default AuthController;
