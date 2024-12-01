import aulaRepo from "../repository/aulaRepo.js"
import { logger } from "../utils/logger.js"
import turmaService from "../services/turma.js"
import atendimentoColetivoService from "../services/atendimentoColetivo.js"
import agendaVoluntarioService from "../services/agendaVoluntario.js"
import voluntarioService from "../services/voluntario.js"
import getDateTime from "../utils/getDateTime.js"

const local = "[aulaService] "

export async function create(aula) {
    logger.info(local + " Criando Aula.")
    await aulaRepo.create(aula)
}


export async function get() {
    logger.info(local + " Buscando Aulas.")
    const aulas = await aulaRepo.get()
    return aulas
}


export async function getById(id) {
    logger.info(local + " Buscando Aula.")
    return aulaRepo.getById(id)
}

export async function getByDiaSemana(voluntarioId, diaSemana) {
    logger.info(local + " Buscando Aula.")
    return aulaRepo.getByDiaSemana(voluntarioId, diaSemana)
}


export async function update(aula) {
    logger.info(local + " Alterando Aula.")
    return aulaRepo.update(aula)
}


export async function deleteAula(id) {
    logger.info(local + " Excluindo Aula.")
    return aulaRepo.deleteAula(id)
}

async function verificaAulaPossivel(novaAula) {
    logger.info(local + "Buscando consultas.")

    let verificada = false
    let codigoMsg = ""

    if(getDateTime(novaAula.horaInicio) >= getDateTime(novaAula.horaFim)){
        return{
            verificada,
            codigoMsg: 8
        }
    }

    if(novaAula.id){
        const aula = await getById(novaAula.id)
        if(!aula){
            return{
                verificada,
                codigoMsg: 6
            }
        }
    }

    const turma = await turmaService.getById(novaAula.turmaId)
    if(turma){
        let existeAulaTurma = false
        const aulasTurma = await turmaService.getByIdDiaSemana(novaAula.turmaId, novaAula.diaSemana)
        if(aulasTurma != null && aulasTurma.length > 0){
            const teste = 0
            for (const aulaTurma of aulasTurma) {
                if (verificaAulaSimultanea(novaAula.horaInicio, novaAula.horaFim, novaAula.diaSemana,aulaTurma) == false) {
                    
                    existeAulaTurma = true
                    break
                }
                teste = teste+1
            }

            if(existeAulaTurma){
                codigoMsg = 7
                return {
                    verificada,
                    codigoMsg
                } 
            }
        }

        const atendimentoColetivo = await atendimentoColetivoService.getById(novaAula.atendimentoColetivoId)
        if(atendimentoColetivo){
            const voluntario = await voluntarioService.getById(novaAula.voluntarioId)
            if(voluntario){
                const agenda = await agendaVoluntarioService.getByDiaSemanaVoluntarioId(novaAula.voluntarioId, novaAula.diaSemana)
                if(agenda){
                    if (verificaHorariosDisponiveis(novaAula.horaInicio, novaAula.horaFim,agenda.horaInicio, agenda.horaFim))
                    {
                        let existeAulaVoluntario = false
                        const aulasVoluntario = await getByDiaSemana(novaAula.voluntarioId, novaAula.diaSemana)
                        for (const aulaVoluntario of aulasVoluntario) {
                            if (!verificaAulaSimultanea(novaAula.horaInicio, novaAula.horaFim, novaAula.diaSemana, aulaVoluntario) == false) {
                                existeAulaVoluntario = true
                                break
                            }
                        }

                        if(existeAulaVoluntario){
                            codigoMsg = 0
                            return {
                                verificada,
                                codigoMsg
                            } 
                        }

                        verificada =  true
                    }
                    else{
                        codigoMsg = 1
                    }
                }
                else{
                    codigoMsg = 2
                }
            }
            else{
                codigoMsg = 3
            }
            
        }
        else{
            codigoMsg = 4

        }
    }
    else{
        codigoMsg = 5
    }

    return {
        verificada,
        codigoMsg
    }
}

export function verificaHorariosDisponiveis(horaInicio, horaFim, agendaVoluntarioHoraInicio, agendaVoluntarioHoraFim){
    horaInicio = getDateTime(horaInicio)
    horaFim = getDateTime(horaFim)
    agendaVoluntarioHoraInicio = getDateTime(agendaVoluntarioHoraInicio)
    agendaVoluntarioHoraFim = getDateTime(agendaVoluntarioHoraFim)
    
    if((horaInicio >= agendaVoluntarioHoraInicio && horaInicio <= agendaVoluntarioHoraFim) && (horaFim >= agendaVoluntarioHoraInicio && horaFim <= agendaVoluntarioHoraFim)){
        return true
    }

    return false
}


export function verificaAulaSimultanea(horaInicio, horaFim, diaSemana,aula) {
    horaInicio = getDateTime(horaInicio)
    horaFim = getDateTime(horaFim)
    aula.horaInicio = getDateTime(aula.horaInicio)
    aula.horaFim = getDateTime(aula.horaFim)

    if(diaSemana == aula.diaSemana){
        if((horaInicio >= aula.horaInicio && horaInicio <= aula.horaFim) || (horaFim >= aula.horaInicio && horaFim <= aula.horaFim)){
            return false
        }
    }

   return true
}


export default {
    get, getById, create, update, deleteAula, getByDiaSemana, verificaAulaPossivel, verificaAulaSimultanea, verificaHorariosDisponiveis
}