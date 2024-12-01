import "reflect-metadata";
import { dataSource } from "../ormConfig.js";
import { User } from "../entity/user.js";
import logger from "../utils/logger.js"

const userRepository = dataSource.getRepository(User);
const local = "[userRepo] "
export async function create(user){
    try {

    const newUser = await userRepository.create({
    nome: user.nome,
    login: user.login,
    senha: user.senha
});

await userRepository.save(newUser);

logger.info(local + "Usuário criado.")
    } 
    catch (error) {
    }
    } 

export async function get(){
    const users = await userRepository.find();
    logger.info(local + "Usuários retornados.")

    return users
  }

 export async function getById(id){
      const user = await userRepository.findOne({where:{ id: id }})
      logger.info(local + "Usuários retornados.")
    return user
  }
  
  export async function update(user){

    const userToUpdate = await userRepository.findOne({where:{ id: user.id }});
    if (userToUpdate) {

        userToUpdate.nome= user.nome,
        userToUpdate.login= user.login,
        userToUpdate.senha= user.senha

      await userRepository.save(userToUpdate);
      logger.info(local + "Usuário alterado.")
      return true

    }
      return false
  }

  export async function deleteUser (id){
    const userToDelete = await userRepository.findOne({where:{ id: id }});
    if (userToDelete) {
      await userRepository.remove(userToDelete)
      logger.info(local + "Usuário removido.")
      return true
    }

    return false
}

export async function getByUserName(userName)
{
    const login = await userRepository.findOne({where:{ login: userName }});
    logger.info(local + "[Login retornado.")

    return login
}

export default {
    get, getById, create, update, deleteUser, getByUserName
}
