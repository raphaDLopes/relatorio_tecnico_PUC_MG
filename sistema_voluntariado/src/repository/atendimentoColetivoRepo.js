import "reflect-metadata";
import { dataSource } from "../ormConfig.js";
import { AtendimentoColetivo } from "../entity/atendimentoColetivo.js";
import logger from "../utils/logger.js"


const atendimentoColetivoRepository = dataSource.getRepository(AtendimentoColetivo);
const local = "[atendimentoColetivoRepo] "

export async function create(atendimentoColetivo){
  try {

    const newAtendimentoColetivo = atendimentoColetivoRepository.create({
      descricao: atendimentoColetivo.descricao
  });

    await atendimentoColetivoRepository.save(newAtendimentoColetivo);

    logger.info(local + "Atendimento Coletivo criado.")
  } 
  catch (error) {

  }
} 

export async function get(){
    const atendimentoColetivos = await atendimentoColetivoRepository.find();
    logger.info(local + "[Atendimentos Coletivos retornados.")

    return atendimentoColetivos
  }

 export async function getById(id){
      const atendimentoColetivo = await atendimentoColetivoRepository.findOne({where:{ id: id }})
      logger.info(local + "[Atendimento Coletivo retornado.")
    return atendimentoColetivo
  }
  
  export async function update(atendimentoColetivo){

    const atendimentoColetivoToUpdate = await atendimentoColetivoRepository.findOne({where:{ id: atendimentoColetivo.id }})
    if (atendimentoColetivoToUpdate) {

      atendimentoColetivoToUpdate.descricao = atendimentoColetivo.descricao

      await atendimentoColetivoRepository.save(atendimentoColetivoToUpdate);
      logger.info(local + "Atendimento Coletivo alterado.")
      return true
    }

    return false
  }

  export async function deleteAtendimentoColetivo (id){
    const atendimentoColetivoToDelete = await atendimentoColetivoRepository.findOne({where:{ id: id }});
    if (atendimentoColetivoToDelete) {
        await atendimentoColetivoRepository.remove(atendimentoColetivoToDelete);
        logger.info(local + "Atendimento Coletivo removido.")
        return true
    }

    return false
}

export default {
    get, getById, create, update, deleteAtendimentoColetivo
}
