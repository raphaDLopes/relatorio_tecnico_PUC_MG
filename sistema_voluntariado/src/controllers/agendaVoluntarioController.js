import agendaVoluntarioService from "../services/agendaVoluntario.js"
import voluntarioService from "../services/voluntario.js"
import logger from "../utils/logger.js"
import messages from "../utils/messages.js"


const local = "[AgendaVoluntarioController] "
export default {
    /**
     * @swagger
     * /agendavoluntario:
     *   get:
     *     summary: Retorna a agenda de todos os voluntários
     *     tags:
     *       - agendaVoluntario
     *     responses:
     *       201:
     *         description: Lista de agendas dos voluntários
     *       404:
     *         description: Nenhuma agenda encontrada
     */
    get:async(req, res, next) => {
        try {
            logger.info(local  + "Obtendo a agenda dos voluntários.")

            const agendaVoluntarios = await agendaVoluntarioService.get()
            if (agendaVoluntarios.length > 0){
                res.status(201).json(agendaVoluntarios)
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
     * /agendavoluntario/{id}:
     *   get:
     *     summary: Retorna a agenda de um voluntário específico
     *     tags:
     *       - agendaVoluntario
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Agenda do voluntário
     *       404:
     *         description: Agenda não encontrada
     */
    getById: async(req, res, next)=>{
        try {
            logger.info(local  + "Obtendo agenda do voluntário.")
            const agendaVoluntario = await agendaVoluntarioService.getById(req.params.id)

            if (agendaVoluntario){
                res.status(201).json(agendaVoluntario)
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
     * /agendavoluntario/{voluntarioId}:
     *   get:
     *     summary: Retorna a agenda de um voluntário pelo ID do voluntário
     *     tags:
     *       - agendaVoluntario
     *     parameters:
     *       - name: voluntarioId
     *         in: path
     *         required: true
     *         description: ID do voluntário
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Agenda do voluntário
     *       404:
     *         description: Agenda não encontrada
     */
    getByVoluntarioId: async(req, res, next)=>{
        try {
            logger.info(local  + "Obtendo agenda do voluntário.")
            const agendaVoluntario = await agendaVoluntarioService.getByVoluntarioId(req.params.voluntarioId)

            if (agendaVoluntario){
                res.status(201).json(agendaVoluntario)
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
 * /agendavoluntario:
 *   post:
 *     summary: Cria uma nova agenda para um voluntário
 *     tags:
 *       - agendaVoluntario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diaSemana:
 *                 type: int
 *                 example: 0
 *               horaInicio:
 *                 type: string
 *                 format: time
 *                 example: "09:00"
 *               horaFim:
 *                 type: string
 *                 format: time
 *                 example: "17:00"
 *               voluntarioId:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *        201:
 *         description: Agenda criada com sucesso
 *        404:
 *         description: Voluntário não encontrado ou já existe uma agenda para esse dia
 */
    post: async(req, res, next) => {
        try {
            logger.info(local  + "Criando agenda do voluntário.")
            
            const voluntario = await voluntarioService.getById(req.body.voluntarioId)
            if(voluntario){
                const agendas = await agendaVoluntarioService.getByVoluntarioId(req.body.voluntarioId)
                let agendaExiste = false
                agendas.forEach(agenda => {
                    if(agenda.diaSemana == req.body.diaSemana){
                        agendaExiste = true
                    }
                })
                if(agendaExiste){
                    res.status(404).send("Já existe uma agenda para esse dia!")
                }
                else{

                    const agendaVoluntario = 
                    {
                        diaSemana: req.body.diaSemana,
                        horaInicio: req.body.horaInicio,
                        horaFim: req.body.horaFim,
                        voluntarioId: req.body.voluntarioId
                    }
                    await agendaVoluntarioService.create(agendaVoluntario)
                    res.status(201).send(messages.msgSucesso())
                    logger.info(messages.msgSucesso(local))
                }
                
            }
            else{
                res.status(404).send("Voluntário não encontrado")
            }
        } catch (error) {
            logger.error(messages.msgFalha(local))      
            logger.error(error)
        }
    },
/**
 * @swagger
 * /agendavoluntario:
 *   put:
 *     summary: Atualiza uma agenda existente
 *     tags:
 *       - agendaVoluntario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "67890"
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
 *               voluntarioId:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       201:
 *         description: Agenda atualizada com sucesso
 *       404:
 *         description: Agenda não encontrada
 */
    put: async(req, res, next) => {
        try {
            logger.info(local  + "Alterando agenda do voluntário.")

            const agendaVoluntario = {
                id: req.body.id,
                diaSemana: req.body.diaSemana,
                horaInicio: req.body.horaInicio,
                horaFim: req.body.horaFim
                }
            const updated = await agendaVoluntarioService.update(agendaVoluntario)
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
     * /agendavoluntario/{id}:
     *   delete:
     *     summary: Deleta uma agenda de um voluntário
     *     tags:
     *       - agendaVoluntario
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Agenda deletada com sucesso
     *       404:
     *         description: Agenda não encontrada
     */
    delete: async(req, res, next) => {
        try {
            logger.info(local  + "Deletando agenda do voluntário.")
            
            const deleted = await agendaVoluntarioService.deleteAgendaVoluntario(req.params.id)

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





