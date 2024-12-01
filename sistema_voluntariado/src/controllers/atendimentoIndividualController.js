import atendimentoIndividualService from "../services/atendimentoIndividual.js"
import logger from "../utils/logger.js"
import messages from "../utils/messages.js"


const local = "[atendimentoIndividualController] "

export default {
     /**
     * @swagger
     * /atendimentoIndividual:
     *   get:
     *     summary: Retorna os atendimentos coletivos
     *     tags:
     *       - atendimentoIndividual
     *     responses:
     *       201:
     *         description: Lista de  atendimentos
     *       404:
     *         description: Nenhum atendimento encontrado
     */
    get:async(req, res, next) => {
        try {
            logger.info(local + "Obtendo Atendimentos Individuais.")

            const atendimentos = await atendimentoIndividualService.get()
            if (atendimentos.length > 0){
                res.status(201).json(atendimentos)
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
     * /atendimentoIndividual/{id}:
     *   get:
     *     summary: Retorna um atendimento específico
     *     tags:
     *       - atendimentoIndividual
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
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
            logger.info(local + "Obtendo Atendimento Individual.")
            
            const atendimentoIndividual = await atendimentoIndividualService.getById(req.params.id)
            if (atendimentoIndividual){
                res.status(201).json(atendimentoIndividual)
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
     * /atendimentoIndividual:
     *   post:
     *     summary: Cria um novo atendimento 
     *     tags:
     *       - atendimentoIndividual
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 example: "Aula de artes"
     *     responses:
     *        201:
     *         description: Atendimento adicionado  com sucesso
     */
    post: async(req, res, next) => {
        try {
            logger.info(local + "Criando Atendimento Individual.")

            const atendimentoIndividual = {
            id: req.body.id,
            descricao: req.body.descricao
        }

            await atendimentoIndividualService.create(atendimentoIndividual)
            res.status(201).send(messages.msgSucesso());
            logger.info(messages.msgSucesso(local))
        } catch (error) {
            logger.error(messages.msgFalha(local))    
            logger.error(error)
        }
    },
 /**
     * @swagger
     * /atendimentoIndividual:
     *   put:
     *     summary: Altera um atendimento coletivo
     *     tags:
     *       - atendimentoIndividual
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *                 example: "1"
     *               descricao:
     *                 type: string
     *                 example: "Aula de artes"
     *     responses:
     *        201:
     *         description: Alterado com sucesso
     *        404:
     *         description: Não encontrado
     */
    put: async(req, res, next) => {
        try {
            logger.info(local + "Alterando Atendimento Individual.")

        const atendimentoIndividual = {
            id: req.body.id,
            descricao: req.body.descricao
        }
        const updated = await atendimentoIndividualService.update(atendimentoIndividual)
        if (updated){
            res.status(201).send(messages.msgSucesso())
            logger.info(messages.msgSucesso(local))
        }
        else
        {
            res.status(404).send(messages.msgNaoEncontrado())
            logger.info(messages.msgNaoEncontrado(local))
        }
        } catch (error) {
            logger.error(messages.msgFalha(local))    
            logger.error(error)
        }
   },
 /**
     * @swagger
     * /atendimentoIndividual/{id}:
     *   delete:
     *     summary: Deleta um atendimento
     *     tags:
     *       - atendimentoIndividual
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
            logger.info(local + "Deletando Atendimento Individual.")

            const deleted = await atendimentoIndividualService.deleteAtendimentoIndividual(req.params.id)
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





