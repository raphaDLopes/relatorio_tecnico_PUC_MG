import atendimentoColetivoRepo from "../repository/atendimentoColetivoRepo.js"
import { logger } from "../utils/logger.js"


const local = "atendimentoColetivoService] "

export async function create(atendimentoColetivo) {
    logger.info(local + "Criando Atendimento Coletivo.")
    atendimentoColetivoRepo.create(atendimentoColetivo)
}


export async function get() {
    logger.info(local + "Buscando Atendimentos Coletivos.")
    const atendimentoColetivos = await atendimentoColetivoRepo.get()
    return atendimentoColetivos
}


export async function getById(id) {
    logger.info(local + "Buscando Atendimento Coletivo.")
    return atendimentoColetivoRepo.getById(id)
}


export async function update(atendimentoColetivo) {
    logger.info(local + "Alterando Atendimento Coletivo.")
    return atendimentoColetivoRepo.update(atendimentoColetivo)
}


export async function deleteAtendimentoColetivo(id) {
    logger.info(local + "Excluindo Atendimento Coletivo.")
    return atendimentoColetivoRepo.deleteAtendimentoColetivo(id)
}


export default {
    get, getById, create, update, deleteAtendimentoColetivo
}


