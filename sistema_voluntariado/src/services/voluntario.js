import voluntarioRepo from "../repository/voluntarioRepo.js"
import consultaRepo from "../repository/consultaRepo.js"
import aulasRepo from "../repository/aulaRepo.js"
import { logger } from "../utils/logger.js"

const local = "[voluntarioSservice] "

export async function create(voluntario) {
    logger.info(local + "Criando voluntário.")
    voluntarioRepo.create(voluntario)
}


export async function get() {
    logger.info(local + "Buscando voluntários.")
    const voluntarios = await voluntarioRepo.get()
    return voluntarios
}


export async function getById(id) {
    logger.info(local + "Buscando voluntário.")
    return voluntarioRepo.getById(id)
}


export async function update(voluntario) {
    logger.info(local + "Alterando voluntário.")
    return voluntarioRepo.update(voluntario)
}


export async function deleteVoluntario(id) {
    logger.info(local + "Excluindo voluntário.")
    return voluntarioRepo.deleteVoluntario(id)
}

export function getConsultasByDiaSemana(voluntarioId, diaSemana) {
    logger.info(local + "Buscando consultas.")
    return consultaRepo.getByVoluntarioIdDiaSemana(voluntarioId, diaSemana)
}

export function getAulasByDiaSemana(voluntarioId, diaSemana) {

    logger.info(local + "Buscando consultas.")
    return aulasRepo.getByVoluntarioIdDiaSemana(voluntarioId, diaSemana)
}


export default {
    get, getById, create, update, deleteVoluntario, getConsultasByDiaSemana, getAulasByDiaSemana
}


