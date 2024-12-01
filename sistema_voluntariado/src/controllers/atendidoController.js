import atendidoService from "../services/atendido.js"
import logger from "../utils/logger.js"
import messages from "../utils/messages.js"

const local = "[atendidoController] "
export default {
    /**
     * @swagger
     * /atendido:
     *   get:
     *     summary: Retorna os atendidos
     *     tags:
     *       - atendido
     *     responses:
     *       201:
     *         description: Lista de atendidos
     *       404:
     *         description: Nenhum atendido encontrado
     */
    get:async(req, res, next) => {
        try {
            logger.info(local + " Obtendo atendidos.")

            const atendidos = await atendidoService.get()
            if (atendidos.length > 0){
                res.status(201).json(atendidos)
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
     * /atendido/{id}:
     *   get:
     *     summary: Retorna um atendido específico
     *     tags:
     *       - atendido
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID 
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Atendido
     *       404:
     *         description: Atendido não encontrado
     */
    getById: async(req, res, next)=>{
        try {
            logger.info(local + "Obtendo atendido.")
            
            const atendido = await atendidoService.getById(req.params.id)
            if (atendido){
                res.status(201).json(atendido)
                logger.info(messages.msgSucesso(local))    
            }
            else{
                res.status(404).send(messages.msgNaoEncontrado());
            }
            
            logger.info(local + "Atendido obtido.")
        } catch (error) {
            res.status(501).send(messages.msgFalha());
            logger.error(messages.msgFalha(local))   
            logger.error(error)
        }
        
    },
    /**
     * @swagger
     * /atendido:
     *   post:
     *     summary: Cria um novo atendido
     *     tags:
     *       - atendido
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 example: "Meu Nome"
     *               cpf:
     *                 type: string
     *                 example: "10806750657"
     *               dataNascimento:
     *                 type: string
     *                 format: date
     *                 example: "1970-01-01"
     *               email:
     *                 type: string
     *                 example: "teste@teste.com.br"
     *               telefone:
     *                 type: string
     *                 exemple: "2124242427"
     *               celular:
     *                 type: string
     *                 exemple: "21978787896"
     *               endereco:
     *                 type: string
     *                 example: "Rua Teste"
     *               cidade: 
     *                 type: string
     *                 example: "Teste cidade"
     *               bairro: 
     *                 type: string
     *                 example: "Teste bairro"
     *               complementoEndereco: 
     *                 type: string
     *                 example: "Teste complementoEndereco"
     *               cep: 
     *                 type: string
     *                 example: "12345678"
     *               matricula: 
     *                 type: string
     *                 example: "1"
     *               
     *     responses:
     *        201:
     *         description: Atendido criado com sucesso
     */
    post: async(req, res, next) => {
        try {
            logger.info(local + " Criando atendido.")

            const atendido = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            dataNascimento: req.body.dataNascimento,
            email: req.body.email,
            telefone: req.body.telefone,
            celular: req.body.celular,
            endereco: req.body.endereco,
            cidade: req.body.cidade,
            bairro: req.body.bairro,
            complementoEndereco: req.body.complementoEndereco,
            cep: req.body.cep,
            matricula: req.body.matricula
        }

            await atendidoService.create(atendido)
            res.status(201).send(messages.msgSucesso());
            logger.info(messages.msgSucesso(local))

        } catch (error) {
            logger.error(messages.msgFalha(local))   
            logger.error(error)
        }
    },
    /**
     * @swagger
     * /atendido:
     *   put:
     *     summary: Altera um atendido
     *     tags:
     *       - atendido
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
     *               nome:
     *                 type: string
     *                 example: "Meu Nome"
     *               cpf:
     *                 type: string
     *                 example: "10806750657"
     *               dataNascimento:
     *                 type: string
     *                 format: date
     *                 example: "1970-01-01"
     *               email:
     *                 type: string
     *                 example: "teste@teste.com.br"
     *               telefone:
     *                 type: string
     *                 example: "2124242456"
     *               celular:
     *                 type: string
     *                 example: "21978787867"
     *               endereco:
     *                 type: string
     *                 example: "Rua Teste"
     *               cidade: 
     *                 type: string
     *                 example: "Teste cidade"
     *               bairro: 
     *                 type: string
     *                 example: "Teste bairro"
     *               complementoEndereco: 
     *                 type: string
     *                 example: "Teste complementoEndereco"
     *               cep: 
     *                 type: string
     *                 example: "12345678"
     *               matricula: 
     *                 type: string
     *                 example: "1"
     *               
     *     responses:
     *        201:
     *         description: Atendido alterado com sucesso
     *        404:
     *         description: Atendido não encontrado
     */
    put: async(req, res, next) => {
        try {
            logger.info(local + " Alterando atendido.")

            const atendido = {
                id: req.body.id,
                nome: req.body.nome,
                cpf: req.body.cpf,
                dataNascimento: req.body.dataNascimento,
                email: req.body.email,
                telefone: req.body.telefone,
                celular: req.body.celular,
                endereco: req.body.endereco,
                cidade: req.body.cidade,
                bairro: req.body.bairro,
                complementoEndereco: req.body.complementoEndereco,
                cep: req.body.cep,
                matricula: req.body.matricula
                }
            const updated = await atendidoService.update(atendido)

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
     * /atendido/{id}:
     *   delete:
     *     summary: Deleta um atendido
     *     tags:
     *       - atendido
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Atendido deletado com sucesso
     *       404:
     *         description: Atendido não encontrado
     */
    delete: async(req, res, next) => {
        try {
            logger.info(local + "Deletando atendido.")
            const deleted =  await atendidoService.deleteAtendido(req.params.id)
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





