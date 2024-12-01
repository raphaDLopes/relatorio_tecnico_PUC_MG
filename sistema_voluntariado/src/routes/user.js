
import express from 'express';
import userController from '../controllers/userController.js'
import { authenticateToken } from '../utils/authenticateToken.js'


const router = express.Router()
router.get('/', authenticateToken,userController.get);
router.get('/:id', authenticateToken,userController.getById);
router.post('/', authenticateToken,userController.post);
router.post('/login', userController.postLogin);
router.put('/', authenticateToken,userController.put);
router.delete('/:id', authenticateToken,userController.delete);

export default router