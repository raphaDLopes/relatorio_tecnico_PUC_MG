import loginRepo from "../repository/loginRepo.js"
import { logger } from "../utils/logger.js"


const local = "[LoginService] "

export async function create(consulta) {
    logger.info(local + " Criando usuário.")
    await loginRepo.create(consulta)
}


export async function getByUserName(username) {
    logger.info(local + " Buscando usuário por username.")
    const response  = await loginRepo.getByUserName(username)
    
    return response

}


export default {
    create, getByUserName
}
