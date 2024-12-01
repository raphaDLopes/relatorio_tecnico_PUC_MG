import "reflect-metadata";
import { dataSource } from "../ormConfig.js";
import { AtendimentoIndividual } from "../entity/atendimentoIndividual.js";
import logger from "../utils/logger.js"

const local = "atendimentoIndividualRepo"
const atendimentoIndividualRepository = dataSource.getRepository(AtendimentoIndividual);

export async function create(atendimentoIndividual){
  try {

    const newAtendimentoIndividual = atendimentoIndividualRepository.create({
      descricao: atendimentoIndividual.descricao
  });

    await atendimentoIndividualRepository.save(newAtendimentoIndividual);
    logger.info(local + "Atendimento Individual criado.")
  } 
  catch (error) {

  }
} 

export async function get(){
    const atendimentoIndividuals = await atendimentoIndividualRepository.find();
    logger.info(local + "[Atendimentos Individuais retornados.")

    return atendimentoIndividuals
  }

 export async function getById(id){
      const atendimentoIndividual = await atendimentoIndividualRepository.findOne({where:{ id: id }});
      logger.info(local + "[Atendimento Individual retornado.")
    return atendimentoIndividual
  }
  
  export async function update(atendimentoIndividual){

    const atendimentoIndividualToUpdate = await atendimentoIndividualRepository.findOne({where:{ id: atendimentoIndividual.id }});
    if (atendimentoIndividualToUpdate) {

      atendimentoIndividualToUpdate.descricao = atendimentoIndividual.descricao

      await atendimentoIndividualRepository.save(atendimentoIndividualToUpdate);
      logger.info(local + "Atendimento individual alterado.")
      return true
    }

    return false
  }

  export async function deleteAtendimentoIndividual (id){
    const atendimentoIndividualToDelete = await atendimentoIndividualRepository.findOne({where:{ id: id }})
    if (atendimentoIndividualToDelete) {
      await atendimentoIndividualRepository.remove(atendimentoIndividualToDelete);
      logger.info(local + "Atendimento individual removido.")
      return true
  }

  return false
}

export default {
    get, getById, create, update, deleteAtendimentoIndividual
}
