import atendimentoColetivoService from "../services/atendimentoColetivo.js"
import logger from "../utils/logger.js"
import messages from "../utils/messages.js"


const local = "[atendimentoColetivoController] "

export default {
     /**
     * @swagger
     * /atendimentoColetivo:
     *   get:
     *     summary: Retorna os atendimentos coletivos
     *     tags:
     *       - atendimentoColetivo
     *     responses:
     *       201:
     *         description: Lista de  atendimentos coletivos
     *       404:
     *         description: Nenhum atendimento coletivo encontrado
     */
    get:async(req, res, next) => {
        try {
            logger.info(local + "Obtendo Atendimentos Coletivos.")

            const atendimentosColetivos = await atendimentoColetivoService.get()
            if (atendimentosColetivos.length > 0){
                res.status(201).json(atendimentosColetivos)
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
     * /atendimentoColetivo/{id}:
     *   get:
     *     summary: Retorna um atendimento coletivo específico
     *     tags:
     *       - atendimentoColetivo
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Atendimento coletivo
     *       404:
     *         description: Atendimento coletivo não encontrado
     */
    getById: async(req, res, next)=>{
        try {
            logger.info(local + "Obtendo Atendimento Coletivo.")
            
            const atendimentoColetivo = await atendimentoColetivoService.getById(req.params.id)

            if (atendimentoColetivo){
                res.status(201).json(atendimentoColetivo)
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
     * /atendimentoColetivo:
     *   post:
     *     summary: Cria um novo atendimento coletivo
     *     tags:
     *       - atendimentoColetivo
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
     *         description: Atendimento coletivo com sucesso
     */
    post: async(req, res, next) => {
        try {
            logger.info(local + "Criando Atendimento Coletivo.")

            const atendimentoColetivo = {
            id: req.body.id,
            descricao: req.body.descricao
        }

            await atendimentoColetivoService.create(atendimentoColetivo)
            res.status(201).send(messages.msgSucesso());
            logger.info(messages.msgSucesso(local))

        } catch (error) {
            logger.error(messages.msgFalha(local))    
            logger.error(error)
        }
    },
    /**
     * @swagger
     * /atendimentoColetivo:
     *   put:
     *     summary: Altera um atendimento coletivo
     *     tags:
     *       - atendimentoColetivo
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
     *         description: Atendimento coletivo com sucesso
     */
    put: async(req, res, next) => {
        try {
            logger.info(local + "Alterando Atendimento Coletivo.")

            const atendimentoColetivo = {
                id: req.body.id,
                descricao: req.body.descricao
                }
            const updated = await atendimentoColetivoService.update(atendimentoColetivo)
            if (updated){
                res.status(201).send(messages.msgSucesso());
                logger.info(messages.msgSucesso(local))
            }
            else
            {
                res.status(404).send(messages.msgNaoEncontrado());
                logger.info(messages.msgNaoEncontrado(local))
            }

        } catch (error) {
            logger.error(messages.msgFalha(local))    
            logger.error(error)
        }
   },
    /**
     * @swagger
     * /atendimentoColetivo/{id}:
     *   delete:
     *     summary: Deleta um atendimento coletivo
     *     tags:
     *       - atendimentoColetivo
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Atendimento coletivo deletado com sucesso
     *       404:
     *         description: Atendimento coletivo não encontrado
     */
    delete: async(req, res, next) => {
        try {
            logger.info(local + "Deletando Atendimento Coletivo.")

            const deleted = await atendimentoColetivoService.deleteAtendimentoColetivo(req.params.id)
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





