
import express from 'express';
import consultaController from '../controllers/consultaController.js'
import { authenticateToken } from '../utils/authenticateToken.js'


const router = express.Router()
router.get('/', authenticateToken, consultaController.get);
router.get('/:id',authenticateToken,  consultaController.getById);
router.post('/',authenticateToken,  consultaController.post);
router.put('/',authenticateToken,  consultaController.put);
router.delete('/:id', authenticateToken, consultaController.delete);

export default router