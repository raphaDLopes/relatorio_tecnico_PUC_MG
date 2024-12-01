import userRepo from "../repository/userRepo.js"
import { logger } from "../utils/logger.js"
import { generateToken } from "../utils/generateToken.js"
import bcrypt from 'bcryptjs'


const local = "[userService] "

export async function create(user) {
    logger.info("[User service] Criando usuário.")

    logger.info(local + " Verificando existência de usuário e senha enviados.")
    if (!user.login || !user.senha) {

        return {
            codErro: 0,
            executado: false
        }
    }

    logger.info(local + " Verificando existência do usuário no banco.")
    const userExists = await userRepo.getByUserName(user.login)
    if (userExists) {

        return {
            codErro: 1,
            executado: false
        }
        
    }

    logger.info(local + " Encriptando senha.")
    user.senha = await bcrypt.hash(user.senha, 10)
    await userRepo.create(user)
    return {
        codErro: 1,
        executado: true
    }
}


export async function get() {
    logger.info("[User service] Buscando usuários.")
    const users = await userRepo.get()
    return users
}


export async function getById(id) {
    logger.info("[User service] Buscando usuário.")
    return userRepo.getById(id)
}


export async function update(user) {
    logger.info("[User service] Alterando usuário.")
    return userRepo.update(user)
}


export async function deleteUser(id) {
    logger.info("[User service] Excluindo usuário.")
    return userRepo.deleteUser(id)
}

export async function getByUserName(username) {
    logger.info(local + " Buscando usuário por username.")
    return  await userRepo.getByUserName(username)
}

export async function login(username, password){
    logger.info(local + " Verificando existência de usuário e senha enviados.")
   
    if (!username || !password) {
        return {
            codErro: 0,
            executado: false
        }    
    }

    logger.info(local + " Verificando existência do usuário no banco.")
    const user = await userRepo.getByUserName(username)
    if (!user) {
        return {
            codErro: 2,
            executado: false
        }
    }

    const validPassword = await bcrypt.compare(password, user.senha);
    if (!validPassword) {
        return {
            codErro: 3,
            executado: false
        }
    }
    
    const token = generateToken(user);

    return { 
        token,
        codErro: -1,
        executado: true
     }
}

export default {
    get, getById, create, update, deleteUser, getByUserName, login
}


