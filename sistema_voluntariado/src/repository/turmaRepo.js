import "reflect-metadata";
import { dataSource } from "../ormConfig.js";
import { Turma } from "../entity/turma.js";
import logger from "../utils/logger.js"


const turmaRepository = dataSource.getRepository(Turma)
const local = "[turmaRepo] "

export async function create(turma){
  try {

    const newTurma = turmaRepository.create({
      id: turma.id,
      numero: turma.numero,
      maximoAlunos: turma.maximoAlunos

  });

    await turmaRepository.save(newTurma);

    logger.info(local + "Turma criada.")
  } 
  catch (error) {

  }
} 

export async function get(){
    const turmas = await turmaRepository.find();
    logger.info(local + "Turmas retornadas.")

    return turmas
  }

 export async function getById(id){
      const turma = await turmaRepository.findOne({where:{ id: id }})
      logger.info(local + "Turma retornada.")
    return turma
  }
  
  export async function update(turma){

    const turmaToUpdate = await turmaRepository.findOne({where:{ id: turma.id }})
    if (turmaToUpdate) {

        turmaToUpdate.numero= turma.numero
        turmaToUpdate.maximoAlunos= turma.maximoAlunos

      await turmaRepository.save(turmaToUpdate);
      logger.info(local + "Turma alterada.")
      return true
    }

    return false
  }

  export async function deleteTurma (id){
    const turmaToDelete = await turmaRepository.findOne({where:{ id: id }})
    if (turmaToDelete) {
        await turmaRepository.remove(turmaToDelete);
        logger.info(local + "Turma removida.")
        return true
    }

    return false
}

export default {
    get, getById, create, update, deleteTurma
}
