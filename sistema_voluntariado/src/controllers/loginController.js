import loginService from "../services/login.js"
import logger from "../utils/logger.js"
import messages from "../utils/messages.js"


const local = "[LoginController] "

export default {
    post: async(req, res, next)=>{
        const { username, password, nome } = req.body;
    
    logger.info(local + " Criando usuário.")



    const userExists = await loginService.getByUserName(username)
    if (userExists) {
        logger.info(local + " Verificando existência de usuário.")
        return res.status(401).json({ message: 'Usuário já existe' });
    }

    logger.info(local + " Encriptando senha.")
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = 
    {  
        login: username,
        senha: hashedPassword,
        nome: nome 
    };

    await loginService.create(newUser)
    logger.info(local + " Usuário criado.")


    res.status(201).send(messages.msgSucesso())
    logger.info(messages.msgSucesso(local))
}


}