import "reflect-metadata";
import { dataSource } from "../ormConfig.js";
import { Consulta } from "../entity/consulta.js";
import logger from "../utils/logger.js"


const consultaRepository = dataSource.getRepository(Consulta);
const local = "[consultaRepo] "

export async function create(consulta){
  try {
    const newConsulta = consultaRepository.create({
      horaInicio: consulta.horaInicio,
      horaFim: consulta.horaFim,
      orientacao: consulta.orientacao,
      atendimentoIndividualId: consulta.atendimentoIndividualId,
      voluntarioId: consulta.voluntarioId,
      atendidoId: consulta.atendidoId,
      diaSemana: consulta.diaSemana
  })

    await consultaRepository.save(newConsulta)
    logger.info(local + "Consulta criado.")
  } 
  catch (error) {

  }
} 

export async function get(){
    const consultas = await consultaRepository.find();
    logger.info(local + "Consultas retornadas.")

    return consultas
  }

 export async function getById(id){
    const consulta = await consultaRepository.findOne({where:{ id: id }})
    logger.info(local + "Consulta retornada.")
    return consulta
  }
  
  export async function update(consulta){

    const consultaToUpdate = await consultaRepository.findOne({where:{ id: consulta.id }});
    if (consultaToUpdate) {

      consultaToUpdate.horaInicio = consulta.horaInicio,
      consultaToUpdate.horaFim = consulta.horaFim,
      consultaToUpdate.orientacao = consulta.conteudo,
      consultaToUpdate.atividadeIndividualId = consulta.atividadeIndividualId,
      consultaToUpdate.voluntarioId = consulta.voluntarioId,
      consultaToUpdate.atendidoId = consulta.atendidoId,
      consultaToUpdate.diaSemana = consulta.diaSemana

      await consultaRepository.save(consultaToUpdate);
      logger.info(local + "Consulta alterada.")
    }
  }

  export async function deleteConsulta (id){
    const consultaToDelete = await consultaRepository.findOne({where:{ id: id }})
    if (consultaToDelete) {
        await consultaRepository.remove(consultaToDelete);
    }
    logger.info(local + "Consulta removida.")
  }

  export async function getByAtendidoIdDiaSemana(atendidoId, diaSemana){
    const consultas = await consultaRepository.find({where:{ atendidoId: atendidoId, diaSemana: diaSemana }});
    logger.info(local + "Consultas retornadas.")

    return consultas
  }

  export async function getByVoluntarioIdDiaSemana(voluntarioId, diaSemana){
    const consultas = await consultaRepository.find({where:{ voluntarioId: voluntarioId, diaSemana: diaSemana }});
    logger.info(local + "Consultas retornadas.")

    return consultas
  }

export default {
    get, getById, create, update, deleteConsulta, getByAtendidoIdDiaSemana, getByVoluntarioIdDiaSemana
}
