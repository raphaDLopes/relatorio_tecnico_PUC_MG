
import express from 'express';
import atendimentoColetivoController from '../controllers/atendimentoColetivoController.js'
import { authenticateToken } from '../utils/authenticateToken.js'


const router = express.Router()
router.get('/', authenticateToken, atendimentoColetivoController.get);
router.get('/:id', authenticateToken, atendimentoColetivoController.getById);
router.post('/',authenticateToken,  atendimentoColetivoController.post);
router.put('/',authenticateToken,  atendimentoColetivoController.put);
router.delete('/:id', authenticateToken, atendimentoColetivoController.delete);

export default router