import { Router } from 'express';
import RespostasController from '../controllers/respostas.controller';
import authMiddleware from '../middleware/auth.middleware';

const respostasRoutes = () => {
    const router = Router();
    const controller = new RespostasController();

    router.get('/', authMiddleware, controller.listarRespostas);
    router.post('/', authMiddleware, controller.adicionarResposta);
    router.get('/:id', authMiddleware, controller.mostrarResposta);
    router.put('/:id', authMiddleware, controller.atualizarResposta);
    router.delete('/:id', authMiddleware, controller.deletarResposta);

    return router;
}

export default respostasRoutes;
