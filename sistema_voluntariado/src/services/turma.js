import aulaRepo from "../repository/aulaRepo.js"
import turmaRepo from "../repository/turmaRepo.js"
import { logger } from "../utils/logger.js"

const local = "[turmaService] "

export async function create(turma) {
    logger.info(local + "Criando turma.")
    turmaRepo.create(turma)
}


export async function get() {
    logger.info(local + "Buscando turmas.")
    const turmas = await turmaRepo.get()
    return turmas
}


export async function getById(id) {
    logger.info(local + "Buscando turma.")
    return turmaRepo.getById(id)
}


export async function update(turma) {
    logger.info(local + "Alterando turma.")
    return turmaRepo.update(turma)
}


export async function deleteTurma(id) {
    logger.info(local + "Excluindo turma.")
    return turmaRepo.deleteTurma(id)
}

export async function getByIdDiaSemana(id, diaSemana) {
    logger.info(local + "Buscando turma.")
    return aulaRepo.getByDiaSemanaTurmaId(id, diaSemana)
}


export default {
    get, getById, create, update, deleteTurma, getByIdDiaSemana
}


