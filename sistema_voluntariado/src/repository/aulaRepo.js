import "reflect-metadata";
import { dataSource } from "../ormConfig.js";
import { Aula } from "../entity/aula.js";
import logger from "../utils/logger.js"


const aulaRepository = dataSource.getRepository(Aula);
const local = "[aulaRepo] "

export async function create(aula){

  try {
    const newAula = aulaRepository.create({
      horaInicio: aula.horaInicio,
      horaFim: aula.horaFim,
      diaSemana: aula.diaSemana,
      conteudo: aula.conteudo,
      turmaId: aula.turmaId,
      atendimentoColetivoId: aula.atendimentoColetivoId,
      voluntarioId: aula.voluntarioId
    });
    
    await aulaRepository.save(newAula)
  } catch (error) {

    console.log(error)
  }
  


  logger.info(local + "Aula criado.")
} 

export async function get(){
    const aulas = await aulaRepository.find();
    logger.info(local + "Aulas retornadas.")

    return aulas
  }

 export async function getById(id){
      const aula = await aulaRepository.findOne({where: { id: id }})
      logger.info(local + "Aula retornada.")
    return aula
  }


  export async function getByDiaSemana(voluntarioId, diaSemana)
  { 
      const aulas = await aulaRepository.find({
        where: [
          { voluntarioId: voluntarioId, diaSemana: diaSemana }
        ]
      })

      logger.info(local  + "Agenda do Voluntário retornada.")
       return aulas
  }
  
  export async function update(aula){

    const aulaToUpdate = await getById(aula.id)
    if (aulaToUpdate) {

        aulaToUpdate.horaInicio = aula.horaInicio,
        aulaToUpdate.diaSemana = aula.diaSemana
        aulaToUpdate.horaFim = aula.horaFim
        aulaToUpdate.conteudo = aula.conteudo
        aulaToUpdate.turmaId = aula.turmaId
        aulaToUpdate.atendimentoColetivoId = aula.atendimentoColetivoId
        aulaToUpdate.voluntarioId = aula.voluntarioId

      await aulaRepository.save(aulaToUpdate);
      logger.info(local + "Aula alterada.")
      return true
    }

    return false
  }

  export async function deleteAula (id){
    const aulaToDelete = await getById(id)


    if (aulaToDelete) {
      await aulaRepository.remove(aulaToDelete)
      logger.info(local + "Aula removida.")
    return true
  }

  return false
}

export async function getByVoluntarioIdDiaSemana(voluntarioId, diaSemana){
  const aulas = await aulaRepository.find({where:[
    { voluntarioId: voluntarioId, diaSemana: diaSemana
  }]})
  logger.info(local + "Aulas retornadas.")
  return aulas
}

export async function getByTurmasIdsDiaSemana(turmasIds, diaSemana){
  const aulas = await aulaRepository.find({where:[{ turmaId: In(turmasIds), diaSemana: diaSemana }]});

  logger.info(local + "Aula retornada.")
  return aulas
}

export async function getByDiaSemanaTurmaId(turmaId, diaSemana){
  const aulas = await aulaRepository.find({
    where: [
      { turmaId: turmaId, diaSemana: diaSemana }
    ],
})
  logger.info(local + "Aulas retornadas.")
  return aulas
}

export default {
    get, getById, create, update, deleteAula, getByDiaSemana, getByVoluntarioIdDiaSemana, getByTurmasIdsDiaSemana, getByDiaSemanaTurmaId
}
