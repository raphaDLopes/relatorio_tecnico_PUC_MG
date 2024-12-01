
import express from 'express';
import aulaController from '../controllers/aulaController.js'
import { authenticateToken } from '../utils/authenticateToken.js'


const router = express.Router()
router.get('/',authenticateToken,  aulaController.get);
router.get('/:id', authenticateToken, aulaController.getById);
router.post('/',authenticateToken,  aulaController.post);
router.put('/', authenticateToken, aulaController.put);
router.delete('/:id',authenticateToken,  aulaController.delete);

export default router