
import express from 'express';
import voluntarioController from '../controllers/voluntarioController.js'
import { authenticateToken } from '../utils/authenticateToken.js'


const router = express.Router()
router.get('/', authenticateToken,voluntarioController.get);
router.get('/:id',authenticateToken, voluntarioController.getById);
router.post('/', authenticateToken, voluntarioController.post);
router.put('/', authenticateToken, voluntarioController.put);
router.delete('/:id', authenticateToken, voluntarioController.delete);

export default router