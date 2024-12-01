import express from 'express';
import agendaVoluntarioController from '../controllers/agendaVoluntarioController.js'
import { authenticateToken } from '../utils/authenticateToken.js'


const router = express.Router()
router.get('/', authenticateToken, agendaVoluntarioController.get);
router.get('/:id',authenticateToken,  agendaVoluntarioController.getById);
router.get('/:voluntarioId',authenticateToken,  agendaVoluntarioController.getByVoluntarioId);
router.post('/',authenticateToken,  agendaVoluntarioController.post);
router.put('/', authenticateToken, agendaVoluntarioController.put);
router.delete('/:id',authenticateToken,  agendaVoluntarioController.delete);



export default router