import voluntarioService from "../services/voluntario.js"
import logger from "../utils/logger.js"
import messages from "../utils/messages.js"

const local = "[voluntarioController]"

export default {
  /**
     * @swagger
     * /voluntario:
     *   get:
     *     summary: Retorna os voluntarios
     *     tags:
     *       - voluntario
     *     responses:
     *       201:
     *         description: Lista de voluntarios
     *       404:
     *         description: Nenhum voluntarios encontrado
     */
    get:async(req, res, next) => {
        try {
            logger.info(local + "Obtendo voluntarios.")

            const voluntarios = await voluntarioService.get()
            if (voluntarios.length > 0){
                res.status(201).json(voluntarios)
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
     * /voluntario/{id}:
     *   get:
     *     summary: Retorna um voluntario específico
     *     tags:
     *       - voluntario
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID 
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Voluntario
     *       404:
     *         description: Voluntario não encontrado
     */
    getById: async(req, res, next)=>{
        try {
            logger.info(local + "Obtendo voluntário.")
            
            const voluntario = await voluntarioService.getById(req.params.id)

            if (voluntario){
                res.status(201).json(voluntario)
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
     * /voluntario:
     *   post:
     *     summary: Cria um novo voluntario
     *     tags:
     *       - voluntario
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
     *         description: Voluntario criado com sucesso
     */
    post: async (req, res, next) => {
        try 
        {
            logger.info(local + " Criando voluntário.")

            const voluntario = {
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

            await voluntarioService.create(voluntario)
            res.status(201).send(messages.msgSucesso());
            logger.info(messages.msgSucesso(local))

        } catch (error) {
            logger.error(messages.msgFalha(local))    
            logger.error(error)
        }
    },
/**
     * @swagger
     * /voluntario:
     *   put:
     *     summary: Altera um voluntario
     *     tags:
     *       - voluntario
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
     *         description: Voluntario alterado com sucesso
     *        404:
     *         description: Voluntario não encontrado
     */

    put: async(req, res, next) => {
        try {
            logger.info(local + " Alterando voluntário.")

            const voluntario = {
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
                cep: req.body.cep
                }
            const updated = await voluntarioService.update(voluntario)
                       
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
     * /voluntario/{id}:
     *   delete:
     *     summary: Deleta um voluntario
     *     tags:
     *       - voluntario
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Voluntario deletado com sucesso
     *       404:
     *         description: Voluntario não encontrado
     */
    delete: async(req, res, next) => {
        try {
            logger.info(local + " Deletando voluntário.")
            const deleted = await voluntarioService.deleteVoluntario(req.params.id)

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





