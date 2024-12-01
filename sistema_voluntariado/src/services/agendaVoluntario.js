import agendaVoluntarioRepo from "../repository/agendaVoluntarioRepo.js"
import { logger } from "../utils/logger.js"

export async function create(agendaVoluntario) {
    logger.info("[AgendaVoluntario service] Criando agenda voluntário.")
    agendaVoluntarioRepo.create(agendaVoluntario)
}


export async function get() {
    logger.info("[AgendaVoluntario service] Buscando agenda agenda voluntário.")
    const agendaVoluntarios = await agendaVoluntarioRepo.get()
    return agendaVoluntarios
}


export async function getById(id) {
    logger.info("[AgendaVoluntario service] Buscando agenda voluntário.")
    return agendaVoluntarioRepo.getById(id)
}


export async function getByVoluntarioId(voluntarioId) {
    logger.info("[AgendaVoluntario service] Buscando agendas do voluntário.")
    return agendaVoluntarioRepo.getByVoluntarioId(voluntarioId)
}


export async function getByDiaSemanaVoluntarioId(voluntarioId, diaSemana) {
    logger.info("[AgendaVoluntario service] Buscando agendas do voluntário.")
    return agendaVoluntarioRepo.getByDiaSemanaVoluntarioId(voluntarioId, diaSemana)
}


export async function update(agendaVoluntario) {
    logger.info("[AgendaVoluntario service] Alterando agenda voluntário.")
    return agendaVoluntarioRepo.update(agendaVoluntario)
}


export async function deleteAgendaVoluntario(id) {
    logger.info("[AgendaVoluntario service] Excluindo agenda voluntário.")
    return agendaVoluntarioRepo.deleteAgendaVoluntario(id)
}


export default {
    get, getById, create, update, deleteAgendaVoluntario, getByVoluntarioId, getByDiaSemanaVoluntarioId
}


