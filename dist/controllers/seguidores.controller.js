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
class SeguidoresController {
    seguir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { followingId } = req.body;
            const followerId = (_a = req.usuario) === null || _a === void 0 ? void 0 : _a.id;
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
                const follow = yield prisma_connection_1.default.follower.create({
                    data: {
                        followerId,
                        followingId
                    }
                });
                return res
                    .status(201)
                    .json({ success: true, msg: "Usuário seguido com sucesso.", data: follow });
            }
            catch (error) {
                console.error("Erro ao seguir usuário:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao tentar seguir o usuário." });
            }
        });
    }
    deixarDeSeguir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { followingId } = req.params;
            const followerId = (_a = req.usuario) === null || _a === void 0 ? void 0 : _a.id;
            try {
                yield prisma_connection_1.default.follower.deleteMany({
                    where: {
                        followerId,
                        followingId
                    }
                });
                return res
                    .status(204)
                    .json({ success: true, msg: "Usuário deixado de seguir com sucesso." });
            }
            catch (error) {
                console.error("Erro ao deixar de seguir usuário:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao tentar deixar de seguir o usuário." });
            }
        });
    }
    listarSeguidores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const followers = yield prisma_connection_1.default.follower.findMany({
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
            }
            catch (error) {
                console.error("Erro ao listar seguidores:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao listar seguidores." });
            }
        });
    }
    listarSeguindo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const following = yield prisma_connection_1.default.follower.findMany({
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
            }
            catch (error) {
                console.error("Erro ao listar seguindo:", error);
                return res
                    .status(500)
                    .json({ success: false, msg: "Erro interno ao listar seguindo." });
            }
        });
    }
}
exports.default = SeguidoresController;
