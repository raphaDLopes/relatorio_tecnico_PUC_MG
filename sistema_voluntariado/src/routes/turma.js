
import express from 'express';
import turmaController from '../controllers/turmaController.js'
import { authenticateToken } from '../utils/authenticateToken.js'


const router = express.Router()
router.get('/',authenticateToken,  turmaController.get);
router.get('/:id', authenticateToken, turmaController.getById);
router.post('/', authenticateToken, turmaController.post);
router.put('/', authenticateToken, turmaController.put);
router.delete('/:id', authenticateToken, turmaController.delete);

export default router