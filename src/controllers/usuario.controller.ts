import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import authMiddleware from "../middleware/auth.middleware";
import { NextFunction } from "express";

const prisma = new PrismaClient();

class UsuarioController {
    public async register(req: Request, res: Response) {
        const { email, senha, nome } = req.body;

        if (!email || !senha || !nome) {
            return res
                .status(400)
                .json({ success: false, msg: "Todos os campos são obrigatórios." });
        }

        try {
            const hashedPassword = bcrypt.hashSync(senha, 8);
            const novoUsuario = await prisma.usuario.create({
                data: {
                    email,
                    senha: hashedPassword,
                    nome,
                }
            });

            return res
                .status(201)
                .json({ success: true, msg: "Usuário registrado com sucesso!", data: novoUsuario });
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao registrar usuário." });
        }
    }

    public async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        try {
            const usuario = await prisma.usuario.findUnique({
                where: { email }
            });

            if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
                return res
                    .status(401)
                    .json({ success: false, msg: "Email ou senha incorretos!" });
            }

            return res
                .status(200)
                .json({ success: true, msg: "Login realizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao logar usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao logar usuário." });
        }
    }

    public async list(req: Request, res: Response, next: NextFunction) {
        authMiddleware(req, res, next);
        try {
            const usuarios = await prisma.usuario.findMany();
            return res
                .status(200)
                .json({ success: true, data: usuarios });
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro ao listar usuários." });
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        authMiddleware(req, res, next);
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        try {
            const usuarioExistente = await prisma.usuario.findUnique({
                where: { id }
            });

            if (!usuarioExistente) {
                return res
                    .status(404)
                    .json({ success: false, msg: "Usuário não encontrado." });
            }

            const hashedPassword = senha ? bcrypt.hashSync(senha, 8) : usuarioExistente.senha;

            const updatedUser = await prisma.usuario.update({
                where: { id },
                data: {
                    email: email || usuarioExistente.email,
                    senha: hashedPassword
                }
            });

            return res
                .status(200)
                .json({ success: true, msg: "Usuário atualizado com sucesso!", data: updatedUser });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro interno ao atualizar usuário." });
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        authMiddleware(req, res, next);
        const { id } = req.params;

        try {
            await prisma.usuario.delete({
                where: { id }
            });
            return res
                .status(204)
                .json({ success: true, msg: "Usuário deletado com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao deletar usuário." });
        }
    }
}

export default UsuarioController;
