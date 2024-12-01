import "reflect-metadata";
import { dataSource } from "../ormConfig.js";
import { AgendaVoluntario } from "../entity/agendaVoluntario.js";
import logger from "../utils/logger.js"


const agendaVoluntarioRepository = dataSource.getRepository(AgendaVoluntario);
const local = "[agendaVoluntarioRepo] "

export async function create(agendaVoluntario){
      const newAgendaVoluntario = agendaVoluntarioRepository.create({
    voluntarioId: agendaVoluntario.voluntarioId,
    diaSemana: agendaVoluntario.diaSemana,
    horaInicio: agendaVoluntario.horaInicio,
    horaFim: agendaVoluntario.horaFim
});

await agendaVoluntarioRepository.save(newAgendaVoluntario);

logger.info(local  + "Agenda Voluntário criada.")
}

export async function get(){
    const agendaVoluntarios = await agendaVoluntarioRepository.find();
    logger.info(local  + "Agenda voluntários retornadas.")

    return agendaVoluntarios
  }

 export async function getById(id)
 {
      const agendaVoluntario = await agendaVoluntarioRepository.findOne({where:{ id: id }});

      logger.info(local  + "Agenda Voluntário retornada.")
      return agendaVoluntario
  }


  export async function getByVoluntarioId(voluntarioId)
  {
       const agendasVoluntario = await agendaVoluntarioRepository.find({ voluntarioId: voluntarioId });
       logger.info(local  + "Agendas do Voluntário retornadas.")
       return agendasVoluntario
   }

   export async function getByDiaSemanaVoluntarioId(voluntarioId, diaSemana)
   {
        const agendaVoluntario = await agendaVoluntarioRepository.findOne({where:{ voluntarioId: voluntarioId, diaSemana: diaSemana}});
        logger.info(local  + "Agenda do Voluntário retornada.")
        return agendaVoluntario
    }
  
  export async function update(agendaVoluntario){

    const agendaVoluntarioToUpdate = await agendaVoluntarioRepository.findOne({where:{ id: agendaVoluntario.id} });
    if (agendaVoluntarioToUpdate) {

        agendaVoluntarioToUpdate.diaSemana= agendaVoluntario.diaSemana
        agendaVoluntarioToUpdate.horaInicio= agendaVoluntario.horaInicio
        agendaVoluntarioToUpdate.horaFim= agendaVoluntario.horaFim

      await agendaVoluntarioRepository.save(agendaVoluntarioToUpdate)
      logger.info(local  + "Agenda Voluntário alterada.")
      return true
    }
    
    return false

  }

  export async function deleteAgendaVoluntario (id){
    const agendaVoluntarioToDelete = await agendaVoluntarioRepository.findOne({where:{ id: id }});
    if (agendaVoluntarioToDelete) {
        await agendaVoluntarioRepository.remove(agendaVoluntarioToDelete)
        logger.info(local  + "Agenda Voluntário removida.")
        return true
    }

    return false
}

export default {
    get, getById, create, update, deleteAgendaVoluntario, getByVoluntarioId, getByDiaSemanaVoluntarioId
}
