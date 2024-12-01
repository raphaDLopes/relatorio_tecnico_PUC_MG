import "reflect-metadata";
import { dataSource } from "../ormConfig.js";
import { Voluntario } from "../entity/voluntario.js";
import logger from "../utils/logger.js"


const voluntarioRepository = dataSource.getRepository(Voluntario);
const local = "[voluntarioRepo] "

export async function create(voluntario){
    try {

   const newVoluntario = voluntarioRepository.create({
    nome: voluntario.nome,
    cpf: voluntario.cpf,
    dataNascimento: voluntario.dataNascimento,
    email: voluntario.email,
    telefone: voluntario.telefone,
    celular: voluntario.celular,
    endereco: voluntario.endereco,
    cidade: voluntario.cidade,
    bairro: voluntario.bairro,
    complementoEndereco: voluntario.complementoEndereco,
    cep: voluntario.cep,
    matricula: voluntario.matricula

});

await voluntarioRepository.save(newVoluntario);

logger.info(local + "Voluntário criado.")
    } 
    catch (error) {}
    } 

export async function get(){
    const voluntarios = await voluntarioRepository.find();
    logger.info(local + "Voluntário retornados.")

    return voluntarios
  }

 export async function getById(id){
      const voluntario = await voluntarioRepository.findOne({where:{ id: id }});
      logger.info(local + "Voluntário retornados.")
    return voluntario
  }
  
  export async function update(voluntario){

    const voluntarioToUpdate = await voluntarioRepository.findOne({where:{ id: voluntario.id }});
    if (voluntarioToUpdate) {

        voluntarioToUpdate.nome= voluntario.nome
        voluntarioToUpdate.cpf= voluntario.cpf
        voluntarioToUpdate.dataNascimento= voluntario.dataNascimento
        voluntarioToUpdate.email= voluntario.email
        voluntarioToUpdate.telefone= voluntario.telefone
        voluntarioToUpdate.celular= voluntario.celular
        voluntarioToUpdate.endereco= voluntario.endereco
        voluntarioToUpdate.cidade= voluntario.cidade
        voluntarioToUpdate.bairro= voluntario.bairro
        voluntarioToUpdate.complementoEndereco= voluntario.complementoEndereco
        voluntarioToUpdate.cep= voluntario.cep

      await voluntarioRepository.save(voluntarioToUpdate);
      logger.info(local + "Voluntário alterado.")
      return true

    }
      return false
  }

  export async function deleteVoluntario (id){
    const voluntarioToDelete = await voluntarioRepository.findOne({where:{ id: id }})

    if (voluntarioToDelete) {
        await voluntarioRepository.remove(voluntarioToDelete);
        logger.info(local + "Voluntário removido.")
        return true
    }
    return false
}

export default {
    get, getById, create, update, deleteVoluntario
}
