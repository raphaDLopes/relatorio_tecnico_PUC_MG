import userService from "../services/user.js"
import logger from "../utils/logger.js"
import messages from "../utils/messages.js"


const local = "[userController] "
export default {
    /**
     * @swagger
     * /user:
     *   get:
     *     summary: Retorna usuários
     *     tags:
     *       - user
     *     responses:
     *       201:
     *         description: Lista de usuários
     *       404:
     *         description: Não encontrados
     */
    get:async(req, res, next) => {
        try {
            logger.info(local + " Obtendo usuários.")
            

            const users = await userService.get()

            if (users.length > 0){
                res.status(201).json(users)
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
     * /user/{id}:
     *   get:
     *     summary: Retorna um usuário
     *     tags:
     *       - user
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: usuário
     *       404:
     *         description: usuário não encontrado
     */
    getById: async (req, res, next)=>{
        try {
            logger.info(local + "Obtendo usuário.")

            const user = await userService.getById(req.params.id)
            if(user){
                res.status(201).json({
                    nome: user.nome,
                    login: user.login
                })
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
     * /user:
     *   post:
     *     summary: Cria um novo usuário 
     *     tags:
     *       - user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 example: "Nome do meu usuário"
     *               login:
     *                 type: string
     *                 example: "user32"
     *               senha:
     *                 type: login
     *                 format: password
     *                 example: "user32"
     * 
     *     responses:
     *        201:
     *         description: Atendimento adicionado  com sucesso
     */
    post: async(req, res, next) => {
        try {
        logger.info(local + " Criando usuário.")

        const user = {
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha
        }


    logger.info(local + " Criando usuário.")
    const response = await userService.create(user)
    if(!response.executado)
    {
       const msgErroUser =  messages.msgErroUser(response.codErro)
       res.status(msgErroUser.codRetorno).send(msgErroUser.msg);
       logger.error(msgErroUser)

    }
    else{
        res.status(201).send(messages.msgSucesso());
        logger.info(messages.msgSucesso(local))
    }

         
    } catch (error) {
         logger.error(messages.msgFalha(local))    
         logger.error(error)
    }
    },
  /**
     * @swagger
     * /user/login:
     *   post:
     *     summary: Retona o token de acesso 
     *     tags:
     *       - user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               login:
     *                 type: string
     *                 example: "user32"
     *               senha:
     *                 type: string
     *                 format: password
     *                 example: "user32"
     * 
     *     responses:
     *        201:
     *          description: Retornado com sucesso.
     *        401:
     *          description: Usuário ou senha inválidos.
     */
    postLogin: async(req, res, next) => {
        try {
            logger.info(local + " Logando usuário.")
            const response  = await userService.login(req.body.login, req.body.senha)
            
            if(!response.executado)
            {
            const msgErroUser =  messages.msgErroUser(response.codErro)

            res.status(msgErroUser.codRetorno).send(msgErroUser);
            logger.error(msgErroUser)
        
            }
            else{
                res.status(201).json(response.token)
                logger.info(messages.msgSucesso(local))
            }
        } catch (error) {
             logger.error(messages.msgFalha(local))    
             logger.error(error)
        }
    },
 /**
     * @swagger
     * /user:
     *   put:
     *     summary: Cria um novo usuário 
     *     tags:
     *       - user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               Id:
     *                 type: string
     *                 example: "2"
     *               nome:
     *                 type: string
     *                 example: "Nome do meu usuário"
     *               login:
     *                 type: string
     *                 example: "user32"
     *               senha:
     *                 type: login
     *                 format: password
     *                 example: "user32"
     * 
     *     responses:
     *        201:
     *          description: Atendimento adicionado  com sucesso
     *        404:
     *          description: Não encontrado
     */
    put: async(req, res, next) => {

        try {
            logger.info("[User Controller] Alterando usuário.")

            const user = {
                id: req.body.id,
                nome: req.body.nome,
                login: req.body.login,
                senha: req.body.senha
                }
            const updated = await userService.update(user)
            
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
     * /user/{id}:
     *   delete:
     *     summary: Deleta um usuário
     *     tags:
     *       - user
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
    delete: async(req, res, next) => {

        try {
            logger.info("[User Controller] Deletando usuário.")
            const deleted = await userService.deleteUser(req.params.id)

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





