import "reflect-metadata";
import { dataSource } from "../ormConfig.js";
import { Atendido } from "../entity/atendido.js";
import { TurmaAtendido } from "../entity/turma_atendido.js";
import logger from "../utils/logger.js"


const atendidoRepository = dataSource.getRepository(Atendido);
const local = "[atendidoRepo] "

export async function create(atendido){
  try {

    const newAtendido = atendidoRepository.create({
      nome: atendido.nome,
      cpf: atendido.cpf,
      dataNascimento: atendido.dataNascimento,
      email: atendido.email,
      telefone: atendido.telefone,
      celular: atendido.celular,
      endereco: atendido.endereco,
      cidade: atendido.cidade,
      bairro: atendido.bairro,
      complementoEndereco: atendido.complementoEndereco,
      cep: atendido.cep,
      matricula: atendido.matricula

  });

    await atendidoRepository.save(newAtendido);

    logger.info(local + "Atendido criado.")
  } 
  catch (error) {

  }
} 

export async function get(){
    const atendidos = await atendidoRepository.find();
    logger.info(local + "[Atendido retornados.")

    return atendidos
  }

 export async function getById(id){
      const atendido = await atendidoRepository.findOne({where:{ id: id }});
      logger.info(local + "[Atendido retornados.")
    return atendido
  }
  
  export async function update(atendido){

    const atendidoToUpdate = await atendidoRepository.findOne({where:{ id: atendido.id }});
    if (atendidoToUpdate) {

        atendidoToUpdate.nome= atendido.nome,
        atendidoToUpdate.cpf= atendido.cpf,
        atendidoToUpdate.dataNascimento= atendido.dataNascimento,
        atendidoToUpdate.email= atendido.email,
        atendidoToUpdate.telefone= atendido.telefone,
        atendidoToUpdate.celular= atendido.celular,
        atendidoToUpdate.endereco= atendido.endereco,
        atendidoToUpdate.cidade= atendido.cidade,
        atendidoToUpdate.bairro= atendido.bairro,
        atendidoToUpdate.complementoEndereco= atendido.complementoEndereco,
        atendidoToUpdate.cep= atendido.cep,
        atendidoToUpdate.matricula= atendido.matricula
        


      await atendidoRepository.save(atendidoToUpdate);
      logger.info(local + "Atendido alterado.")
      return true
    }

    return false
  }

  export async function deleteAtendido (id){
    const atendidoToDelete = await atendidoRepository.findOne({where:{ id: id }})

    if (atendidoToDelete) 
    {
      await atendidoRepository.remove(atendidoToDelete)
      logger.info(local + "Atendido removido.")
      return true
    }

    return false
}

export async function getByTurmasIdsDiaSemana(atendidoId, diaSemana) {
  logger.info(local + "Buscando aulas do atendido.")
  const turmaAtendidoRepository = dataSource.getRepository(TurmaAtendido);
  const turmasAtendido = await turmaAtendidoRepository.find({
    where: [{ atendidoId: atendidoId }],
    relations: ['turma', 'turma.aula'],
  });

  let aulas = []
  await turmasAtendido.forEach(turmaAtendido => {
    turmaAtendido.turma.aula.forEach(aula => {
      if(aula.diaSemana == diaSemana){
        aulas.push(aula)
      }
    })
  })

  return aulas
}


export default {
    get, getById, create, update, deleteAtendido, getByTurmasIdsDiaSemana
}
