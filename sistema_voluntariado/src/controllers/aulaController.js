import aulaService from "../services/aula.js"
import logger from "../utils/logger.js"

import messages from "../utils/messages.js"


const local = "[aulaController] "


export default {
     /**
     * @swagger
     * /aula:
     *   get:
     *     summary: Retorna as aulas
     *     tags:
     *       - aula
     *     responses:
     *       201:
     *         description: Lista de aulas
     *       404:
     *         description: Nenhuma aula encontrada
     */
    get:async(req, res, next) => {
        try {
            logger.info(local + "Obtendo Aulas.")

            const aulas = await aulaService.get()
            if (aulas.length > 0){
                res.status(201).json(aulas)
                logger.info(messages.msgSucesso(local))    
            }
            else{
                res.status(404).send(messages.msgNaoEncontrado());
            }
        } catch (error) {
            logger.error(messages.msgFalha(local))   
            logger.error(error)
        }
       
    },
    /**
     * @swagger
     * /aula/{id}:
     *   get:
     *     summary: Retorna uma aula específica
     *     tags:
     *       - aula
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID do voluntário
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Atendimento 
     *       404:
     *         description: Atendimento  não encontrado
     */
    getById: async(req, res, next)=>{
        try {
            logger.info(local + "Obtendo Aula.")
            
            const aula = await aulaService.getById(req.params.id)
            if (aula){
                res.status(201).json(aula)
                logger.info(messages.msgSucesso(local))    
            }
            else{
                res.status(404).send(messages.msgNaoEncontrado());
            }
        } catch (error) {
            logger.error(messages.msgFalha(local))   
            logger.error(error)
        }
        
    },
    /**
     * @swagger
     * /aula:
     *   post:
     *     summary: Cria um novo atendimento 
     *     tags:
     *       - aula
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               diaSemana:
     *                 type: int
     *                 example: 4
     *               horaInicio:
     *                 type: string
     *                 format: time
     *                 example: "10:00"
     *               horaFim:
     *                 type: string
     *                 format: time
     *                 example: "18:00"
     *               conteudo:
     *                 type: string
     *                 example: "Aula de inglês"
     *               turmaId:
     *                 type: string
     *                 example: "1"
     *               atendimentoColetivoId:
     *                 type: string
     *                 example: "1"
     *               voluntarioId:
     *                 type: string
     *                 example: "1"
     *     responses:
     *        201:
     *          description: Atendimento adicionado  com sucesso
     *        401:
     *          description: Já existe uma aula para o voluntario neste horário.
     *        402:
     *          description: Horário incompatível.
     *        403:
     *          description: O voluntário não possui agenda cadastrada.
     *        405:
     *          description: Voluntário não encontrado.
     *        406:
     *          description: Atividade coletiva não encontrada.
     *        407:
     *          description: Turma não encontrada.
     *        408:
     *          description: Aula não encontrada.
     *        409:
     *          description: Já existe uma aula para a turma ocupando esse horário.
     *        413:
     *          description: O horário do início da aula não pode ser maior ou igual ao do final.
     */
    post: async(req, res, next) => {
        try {
            logger.info(local + "Criando Aula.")
            const aula = {
                horaInicio: req.body.horaInicio,
                horaFim: req.body.horaFim,
                conteudo: req.body.conteudo,
                turmaId: req.body.turmaId,
                diaSemana: req.body.diaSemana, 
                atendimentoColetivoId: req.body.atendimentoColetivoId,
                voluntarioId: req.body.voluntarioId
            }
            
            const aulaPossivel = await aulaService.verificaAulaPossivel(aula)
            if(aulaPossivel.verificada){
                await aulaService.create(aula)
                res.status(201).send(messages.msgSucesso())
                logger.info(messages.msgSucesso(local))
            }
            else
            {
               const msgErroAula =  messages.msgErroAula(aulaPossivel.codigoMsg)
               res.status(404).send(msgErroAula);
               logger.error(msgErroAula)

            }          
        } catch (error) {
            logger.error(messages.msgFalha(local))   
            logger.error(error)
        }
    },
 /**
     * @swagger
     * /aula:
     *   put:
     *     summary: Altera uma aula 
     *     tags:
     *       - aula
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               Id:
     *                 type: string
     *                 example: "1"
     *               diaSemana:
     *                 type: int
     *                 example: 4
     *               horaInicio:
     *                 type: string
     *                 format: time
     *                 example: "10:00"
     *               horaFim:
     *                 type: string
     *                 format: time
     *                 example: "18:00"
     *               conteudo:
     *                 type: string
     *                 example: "Aula de inglês"
     *               turmaId:
     *                 type: string
     *                 example: "1"
     *               atendimentoColetivoId:
     *                 type: string
     *                 example: "1"
     *               voluntarioId:
     *                 type: string
     *                 example: "1"
     *     responses:
     *        201:
     *          description: Atendimento adicionado  com sucesso
     *        401:
     *          description: Já existe uma aula para o voluntario neste horário.
     *        402:
     *          description: Horário incompatível.
     *        403:
     *          description: O voluntário não possui agenda cadastrada.
     *        405:
     *          description: Voluntário não encontrado.
     *        406:
     *          description: Atividade coletiva não encontrada.
     *        407:
     *          description: Turma não encontrada.
     *        408:
     *          description: Aula não encontrada.
     *        409:
     *          description: Já existe uma aula para a turma ocupando esse horário.
     *        413:
     *          description: O horário do início da aula não pode ser maior ou igual ao do final.
     */
    put: async(req, res, next) => {
        try {
            logger.info(local + "Alterando Aula.")

            const aula = {
                id: req.body.id,
                horaInicio: req.body.horaInicio,
                horaFim: req.body.horaFim,
                diaSemana: req.body.diaSemana, 
                conteudo: req.body.conteudo,
                turmaId: req.body.turmaId,
                atendimentoColetivoId: req.body.atendimentoColetivoId,
                voluntarioId: req.body.voluntarioId
            }
            const aulaPossivel = await aulaService.verificaAulaPossivel(aula)
            if(aulaPossivel.verificada){
                await aulaService.update(aula)
                res.status(201).send(messages.msgSucesso())
                logger.info(messages.msgSucesso(local))
            }
            else
            {
               const msgErroAula =  messages.msgErroAula(aulaPossivel.codigoMsg)
               res.status(404).send(msgErroAula);
               logger.error(msgErroAula)

            }        
        } catch (error) {
            logger.error(messages.msgFalha(local))   
            logger.error(error)
        }
   },
/**
     * @swagger
     * /aula/{id}:
     *   delete:
     *     summary: Deleta um atendimento
     *     tags:
     *       - aula
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Atendimento deletado com sucesso
     *       404:
     *         description: Atendimento não encontrado
     */
    delete: async(req, res, next) => {
        try {
            logger.info(local + "Deletando Aula.")

            const deleted = await aulaService.deleteAula(req.params.id)
            if (deleted){
                res.status(201).send(messages.msgSucesso());
                logger.info(messages.msgSucesso(local))
            }
            else{
                res.status(404).send(messages.msgNaoEncontrado());
                logger.info(messages.msgNaoEncontrado(local))
            }
            
        } catch (error) {
            logger.error(messages.msgFalha(local))   
            logger.error(error)
        }
        
    }
}





