import atendidoRepo from "../repository/atendidoRepo.js"
import consultaRepo from "../repository/consultaRepo.js"
import aulaRepo from "../repository/aulaRepo.js"
import turmaRepo from "../repository/turmaRepo.js"
import { logger } from "../utils/logger.js"


const local = "[atendidoRepo] "
export async function create(atendido) {
    logger.info(local + "Criando atendido.")
    atendidoRepo.create(atendido)
}


export async function get() {
    logger.info(local + "Buscando atendidos.")
    const atendidos = await atendidoRepo.get()
    return atendidos
}


export async function getById(id) {
    logger.info(local + "Buscando atendido.")
    return atendidoRepo.getById(id)
}


export async function update(atendido) {
    logger.info(local + "Alterando atendido.")
    return atendidoRepo.update(atendido)
}


export async function deleteAtendido(id) {
    logger.info(local + "Excluindo atendido.")
    return atendidoRepo.deleteAtendido(id)
}

export function getConsultasByIdDiaSemana(id, diaSemana) {
    logger.info(local + "Buscando consultas.")
    return consultaRepo.getByAtendidoIdDiaSemana(id, diaSemana)
    
}

export async function getByTurmasIdsDiaSemana(AtendidoId, diaSemana) {
    logger.info(local + "Buscando turmas.")

    return await atendidoRepo.getByTurmasIdsDiaSemana(AtendidoId, diaSemana)
}


export default {
    get, getById, create, update, deleteAtendido, getConsultasByIdDiaSemana, getByTurmasIdsDiaSemana
}


