import consultaService from "../services/consulta.js"
import logger from "../utils/logger.js"
import messages from "../utils/messages.js"


const local = "[ConsultaController] "

export default {
     /**
     * @swagger
     * /consulta:
     *   get:
     *     summary: Retorna as consultas
     *     tags:
     *       - consulta
     *     responses:
     *       201:
     *         description: Lista de consultas
     *       404:
     *         description: Nenhuma consulta encontrada
     */
    get:async(req, res, next) => {
        try {
            logger.info(local + " Obtendo Consultas.")

            const response = await consultaService.get()
            if (response.length > 0){
                res.status(201).json(response)
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
     * /consulta/{id}:
     *   get:
     *     summary: Retorna uma aula específica
     *     tags:
     *       - consulta
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
            logger.info(local + " Obtendo Consulta.")
            const consulta = await consultaService.getById(req.params.id)

            if (consulta){
                res.status(201).json(consulta)
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
     * /consulta:
     *   post:
     *     summary: Cria um novo atendimento 
     *     tags:
     *       - consulta
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
     *               orientacao:
     *                 type: string
     *                 example: "beber mais água"
     *               atendimentoColetivoId:
     *                 type: string
     *                 example: "1"
     *               voluntarioId:
     *                 type: string
     *                 example: "1"
     *     responses:
     *        201:
     *         description: Atendimento adicionado  com sucesso
     *        405:
     *         description: Atividade individual não encontrada.
     *        406:
     *         description: Voluntário não encontrado.
     *        407:
     *         description: Atendido não encontrado.
     *        408:
     *         description: Já existe uma consulta para o atendido nesse horário.
     *        409:
     *         description: Já existe uma aula para o atendido nesse horário.
     *        410:
     *         description: Já existe uma aula para o voluntário nesse horário.
     *        411:
     *         description: Já existe uma consulta para o voluntário nesse horário.
     *        412: 
     *         description: Horário incompatível com a agenda do voluntário.
     *        413: 
     *         description: O horário do início da consulta não pode ser maior ou igual ao do final.
     */
    post: async(req, res, next) => {
        try {
            logger.info(local + " Criando Consulta.")

            const consulta = {
                horaInicio: req.body.horaInicio,
                horaFim: req.body.horaFim,
                orientacao: req.body.orientacao,
                atendimentoIndividualId: req.body.atendimentoIndividualId,
                voluntarioId: req.body.voluntarioId,
                atendidoId: req.body.atendidoId,
                diaSemana: req.body.diaSemana,
            }
            
            const consultaPossivel = await consultaService.verificaConsultaPossivel(consulta)
            if(consultaPossivel.verificada){
                await consultaService.create(consulta)
                res.status(201).send(messages.msgSucesso())
                logger.info(messages.msgSucesso(local))
            }else{
                // const msgErroConsulta =  messages.msgErroConsulta(consultaPossivel.codigoMsg)
                // res.status(404).send(msgErroConsulta);
                // logger.error(msgErroConsulta)

                const msgErroConsulta =  messages.msgErroConsulta(consultaPossivel.codigoMsg)
                res.status(404).send(msgErroConsulta);
               logger.error(msgErroConsulta)
            }
        } catch (error) {
            logger.error(messages.msgFalha(local))   
            logger.error(error)
        }
    },
 /**
     * @swagger
     * /consulta:
     *   put:
     *     summary: Cria um novo atendimento 
     *     tags:
     *       - consulta
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
     *               orientacao:
     *                 type: string
     *                 example: "beber mais água"
     *               atendimentoColetivoId:
     *                 type: string
     *                 example: "1"
     *               voluntarioId:
     *                 type: string
     *                 example: "1"
     *     responses:
     *        201:
     *         description: Atendimento adicionado  com sucesso
     *        405:
     *         description: Atividade individual não encontrada.
     *        406:
     *         description: Voluntário não encontrado.
     *        407:
     *         description: Atendido não encontrado.
     *        408:
     *         description: Já existe uma consulta para o atendido nesse horário.
     *        409:
     *         description: Já existe uma aula para o atendido nesse horário.
     *        410:
     *         description: Já existe uma aula para o voluntário nesse horário.
     *        411:
     *         description: Já existe uma consulta para o voluntário nesse horário.
     *        412: 
     *         description: Horário incompatível com a agenda do voluntário.
     *        413: 
     *         description: O horário do início da consulta não pode ser maior ou igual ao do final.

     */
    put: async(req, res, next) => {
        try {
            logger.info(local + " Alterando Consulta.")

            const consulta = {
                id: req.body.id,
                horaInicio: req.body.horaInicio,
                horaFim: req.body.horaFim,
                orientacao: req.body.conteudo,
                atividadeIndividualId: req.body.atividadeIndividualId,
                voluntarioId: req.body.voluntarioId,
                atendidoId: req.body.atendidoId 
            }
            
            res.status(201).send(`Alterada com sucesso!`)
            logger.info(local + " Consulta alterada.")

            const consultaPossivel = await consultaService.verificaConsultaPossivel(consulta)
            if(consultaPossivel){
                await consultaService.update(consulta)
                res.status(201).send(messages.msgSucesso())
                logger.info(messages.msgSucesso(local))
            }else{
                const msgErroConsulta =  messages.msgErroConsulta(consultaPossivel.codigoMsg)
                res.status(404).send(msgErroConsulta);
                logger.error(msgErroConsulta)
            }

        } 
        catch (error) {
            logger.error(messages.msgFalha(local))   
            logger.error(error)
        }
   },
/**
     * @swagger
     * /consulta/{id}:
     *   delete:
     *     summary: Deleta um atendimento
     *     tags:
     *       - consulta
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
            logger.info(local + " Deletando Consulta.")

            consultaService.deleteConsulta(req.params.id)
            res.status(200).send(`Requisição recebida com sucesso!`);
            logger.info(local + " Consulta deletada.")
            
        } catch (error) {
            logger.error(messages.msgFalha(local))   
            logger.error(error)
        }
        
    }
}





