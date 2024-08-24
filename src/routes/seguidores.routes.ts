import { Router } from 'express';
import SeguidoresController from '../controllers/seguidores.controller';
import authMiddleware from '../middleware/auth.middleware';

const seguidoresRoutes = () => {
    const router = Router();
    const controller = new SeguidoresController();

    router.post('/seguir', authMiddleware, controller.seguir);
    router.delete('/deixarDeSeguir/:followingId', authMiddleware, controller.deixarDeSeguir);
    router.get('/seguidores/:userId', authMiddleware, controller.listarSeguidores);
    router.get('/seguindo/:userId', authMiddleware, controller.listarSeguindo);

    return router;
}

export default seguidoresRoutes;