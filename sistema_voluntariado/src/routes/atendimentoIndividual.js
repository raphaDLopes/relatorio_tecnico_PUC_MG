
import express from 'express';
import atendimentoIndividualController from '../controllers/atendimentoIndividualController.js'
import { authenticateToken } from '../utils/authenticateToken.js'


const router = express.Router()
router.get('/', authenticateToken, atendimentoIndividualController.get);
router.get('/:id', authenticateToken,atendimentoIndividualController.getById);
router.post('/', authenticateToken, atendimentoIndividualController.post);
router.put('/', authenticateToken, atendimentoIndividualController.put);
router.delete('/:id', authenticateToken, atendimentoIndividualController.delete);

export default router