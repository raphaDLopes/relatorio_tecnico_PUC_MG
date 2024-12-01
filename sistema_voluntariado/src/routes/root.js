import express from 'express';
import { authenticateToken } from '../utils/authenticateToken.js'



const router = express.Router()

router.get('/', authenticateToken, function (req, res, next) {
    res.status(200).send({
        title: "Sistema de controle de atividades de voluntário API",
        version: "0.0.1"
    });
});

export default router
