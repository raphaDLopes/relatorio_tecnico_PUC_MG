import turmaService from "../services/turma.js"
import logger from "../utils/logger.js"
import messages from "../utils/messages.js"


const local = "[turmaController] "
export default {
     /**
     * @swagger
     * /turma:
     *   get:
     *     summary: Retorna as consultas
     *     tags:
     *       - turma
     *     responses:
     *       201:
     *         description: Lista de consultas
     *       404:
     *         description: Nenhuma consulta encontrada
     */
    get:async(req, res, next) => {
        try {
            logger.info(local + "Obtendo turmas.")

            const turmas = await turmaService.get()
            if (turmas.length > 0){
                res.status(201).json(turmas)
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
     * /turma/{id}:
     *   get:
     *     summary: Retorna uma turma específica
     *     tags:
     *       - turma
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: consulta 
     *       404:
     *         description: consulta não encontrada
     */
    getById: async(req, res, next)=>{
        try {
            logger.info(local + "Obtendo turma.")
            
            const turma = await turmaService.getById(req.params.id)
            if (turma){
                res.status(201).json(turma)
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
     * /turma:
     *   post:
     *     summary: Cria uma turma
     *     tags:
     *       - turma
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               numero:
     *                 type: string
     *                 example: "12345"
     *               maximoAlunos:
     *                 type: int
     *                 example: 10
     *     responses:
     *        201:
     *         description: Criado com sucesso
     */
    post: async(req, res, next) => {
        try {
            logger.info(local + "Criando turma.")

            const turma = {
                id: req.body.id,
                numero: req.body.numero,
                maximoAlunos: req.body.maximoAlunos
                }

            await turmaService.create(turma)
            res.status(201).send(messages.msgSucesso())
            logger.info(messages.msgSucesso(local))

        } catch (error) {
            logger.error(messages.msgFalha(local))    
            logger.error(error)
        }
    },
/**
     * @swagger
     * /turma:
     *   put:
     *     summary: Cria um nova turma
     *     tags:
     *       - turma
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               numero:
     *                 type: string
     *                 example: "12345"
     *               maximoAlunos:
     *                 type: int
     *                 example: 10
     *     responses:
     *        201:
     *         description: Criado com sucesso
     *        404:
     *         description: Não encontrado
     */
    put: (req, res, next) => {
        try {
            logger.info(local + "Alterando turma.")

            const turma = {
                id: req.body.id,
                numero: req.body.numero,
                maximoAlunos: req.body.maximoAlunos
                }
            const updated = turmaService.update(turma)
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
     * /turma/{id}:
     *   delete:
     *     summary: Deleta uma turma
     *     tags:
     *       - turma
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Deletado com sucesso
     *       404:
     *         description: Não encontrado
     */
    delete: (req, res, next) => {
        try {
            logger.info(local + "Deletando turma.")

            turmaService.deleteTurma(req.params.id)
            res.status(200).send(`Requisição recebida com sucesso!`);
            logger.info(local + "Turma deletado.")
            
        } catch (error) {
            logger.error(messages.msgFalha(local))    
            logger.error(error)
        }
        
    }
}





