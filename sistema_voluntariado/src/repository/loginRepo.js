import logger from "../utils/logger.js"
import { dataSource } from "../ormConfig.js";
import { User } from "../entity/user.js";


const loginRepository = dataSource.getRepository(User);

export async function getByUserName(userName)
{
    const login = await loginRepository.findOne({where:{ userName: userName }});
    logger.info(local + "[Login retornado.")

    return login
}


export async function create(newLogin){
  try {
    const user = consultaRepository.create({
     login: newLogin.login,
     senha: newLogin.senha,
     nome: newLogin.nome
  })

    await loginRepository.save(user)
    logger.info(local + "Login criado.")
  } 
  catch (error) {

  }
} 




  export default {
    getByUserName, create
  }
