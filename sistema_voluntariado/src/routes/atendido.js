import { authenticateToken } from '../utils/authenticateToken.js'
import express from 'express';
import atendidoController from '../controllers/atendidoController.js'

const router = express.Router()
router.get('/',authenticateToken ,atendidoController.get);
router.get('/:id', authenticateToken,atendidoController.getById);
router.post('/', authenticateToken,atendidoController.post);
router.put('/', authenticateToken,atendidoController.put);
router.delete('/:id', authenticateToken,atendidoController.delete);

export default router