import consultaRepo from "../repository/consultaRepo.js"
import { logger } from "../utils/logger.js"
import atendimentoIndividualService from "../services/atendimentoIndividual.js"
import voluntarioService from "../services/voluntario.js"
import atendidoService from "../services/atendido.js"
import aulaService from "../services/aula.js"
import agendaVoluntarioService from "../services/agendaVoluntario.js"
import { getDateTime } from "../utils/getDateTime.js"


const local = "[consultaService] "

export async function create(consulta) {
    logger.info(local + " Criando Consulta.")
    consultaRepo.create(consulta)
}


export async function get() {
    logger.info(local + " Buscando Consultas.")
    const consultas = await consultaRepo.get()
    return consultas
}


export async function getById(id) {
    logger.info(local + " Buscando Consulta.")
    return consultaRepo.getById(id)
}


export async function update(consulta) {
    logger.info(local + " Alterando Consulta.")
    consultaRepo.update(consulta)
}


export async function deleteConsulta(id) {
    logger.info(local + " Excluindo Consulta.")
    return consultaRepo.deleteConsulta(id)
}

export async function verificaConsultaPossivel(novaConsulta) {
    logger.info(local + " Validando dados da consulta.")

    let verificada = false
    let codigoMsg = ""

    if(getDateTime(novaConsulta.horaInicio) >= getDateTime(novaConsulta.horaFim)){
        return{
            verificada,
            codigoMsg: 9
        }
    }

    if(novaConsulta.id){

        const consulta = await getById(novaConsulta.id)
        if(!consulta){
            return{
                verificada,
                codigoMsg: 0
            }
        }
    }
        const atendimentoIndividual = await atendimentoIndividualService.getById(novaConsulta.atendimentoIndividualId)
        if(atendimentoIndividual){
            const voluntario = await voluntarioService.getById(novaConsulta.voluntarioId)
            if(voluntario){

                const aulasVoluntario = await voluntarioService.getAulasByDiaSemana(novaConsulta.voluntarioId, novaConsulta.diaSemana)
                if(aulasVoluntario){
                    let existeAula = false
                    for (const aulaVoluntario of aulasVoluntario) {
                        if (aulaService.verificaAulaSimultanea(novaConsulta.horaInicio, novaConsulta.horaFim, novaConsulta.diaSemana,aulaVoluntario) == false) {
                            existeAula = true
                            break 
                        }
                    }

                    if(existeAula){
                        return {
                            verificada,
                            codigoMsg: 6
                        } 
                    }
                }

                const consultasVoluntario = await voluntarioService.getConsultasByDiaSemana(novaConsulta.voluntarioId, novaConsulta.diaSemana)
                if(consultasVoluntario){
                    let existeConsulta = false
                    for (const consultaVoluntario of consultasVoluntario) {

                        if (verificaConsultaSimultanea(novaConsulta.horaInicio, novaConsulta.horaFim, novaConsulta.diaSemana,consultaVoluntario) == false) {
                            existeConsulta = true
                            break
                        }
                    }

                    if(existeConsulta){
                        return {
                            verificada,
                            codigoMsg: 7
                        } 
                    }
                }

                const agendaVoluntario = await agendaVoluntarioService.getByDiaSemanaVoluntarioId(novaConsulta.voluntarioId, novaConsulta.diaSemana)
                if(agendaVoluntario){
                    if (aulaService.verificaHorariosDisponiveis(novaConsulta.horaInicio, novaConsulta.horaFim, agendaVoluntario.horaInicio,agendaVoluntario.horaFim) == false) {
                        return {
                            verificada,
                            codigoMsg: 8
                        } 
                    }
                }
                
                const atendido = await atendidoService.getById(novaConsulta.atendidoId)
                if(atendido){
                    const consultasAtendido = await atendidoService.getConsultasByIdDiaSemana(novaConsulta.atendidoId, novaConsulta.diaSemana)
                    let existeConsulta = false
                    if(consultasAtendido){
                        for (const consultaAtendido of consultasAtendido) {
                            if (verificaConsultaSimultanea(novaConsulta.horaInicio, novaConsulta.horaFim, novaConsulta.diaSemana,consultaAtendido) == false) {
                                existeConsulta = true
                                break
                                
                            }
                        }

                        if(existeConsulta){
                            return {
                                verificada,
                                codigoMsg: 4
                            } 
                        }
                    }
                    const aulasAtendido = await atendidoService.getByTurmasIdsDiaSemana(novaConsulta.atendidoId, novaConsulta.diaSemana)
                    
                    if(aulasAtendido){
                        for (const aulaAtendido of aulasAtendido) {
                            if (aulaService.verificaAulaSimultanea(novaConsulta.horaInicio, novaConsulta.horaFim, novaConsulta.diaSemana,aulaAtendido) == false) {
                                return {
                                    verificada,
                                    codigoMsg: 5
                                } 
                            }
                        }
                    }

                    verificada =  true 
                    
                }
                else{
                    codigoMsg = 3
                }
            }
            else{
                codigoMsg = 2
            }
        }
        else{
            codigoMsg = 1
        }

        return {
            verificada,
            codigoMsg
        }
}


export function verificaConsultaSimultanea(horaInicio, horaFim,diaSemana ,consulta) {
    horaInicio = getDateTime(horaInicio)
    horaFim = getDateTime(horaFim)
    consulta.horaInicio = getDateTime(consulta.horaInicio)
    consulta.horaFim = getDateTime(consulta.horaFim)

    if(diaSemana == consulta.diaSemana){

        if((horaInicio >= consulta.horaInicio && horaInicio <= consulta.horaFim) || (horaFim >= consulta.horaInicio && horaFim <= consulta.horaFim)){
            return false
        }
    }

   return true
}


export default {
    get, getById, create, update, deleteConsulta, verificaConsultaPossivel, verificaConsultaSimultanea
}


