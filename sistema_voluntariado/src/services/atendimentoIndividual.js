import atendimentoIndividualRepo from "../repository/atendimentoIndividualRepo.js"
import { logger } from "../utils/logger.js"


const local = "atendimentoIndividualService] "

export async function create(atendimentoIndividual) {
    logger.info(local + "Criando Atendimento Individual.")
    atendimentoIndividualRepo.create(atendimentoIndividual)
}


export async function get() {
    logger.info(local + "Buscando Atendimentos Individuais.")
    const atendimentoIndividuals = await atendimentoIndividualRepo.get()
    return atendimentoIndividuals
}


export async function getById(id) {
    logger.info(local + "Buscando Atendimento Individual.")
    return atendimentoIndividualRepo.getById(id)
}


export async function update(atendimentoIndividual) {
    logger.info(local + "Alterando Atendimento Individual.")
    return atendimentoIndividualRepo.update(atendimentoIndividual)
}


export async function deleteAtendimentoIndividual(id) {
    logger.info(local + "Excluindo Atendimento Individual.")
    return atendimentoIndividualRepo.deleteAtendimentoIndividual(id)
}


export default {
    get, getById, create, update, deleteAtendimentoIndividual
}


