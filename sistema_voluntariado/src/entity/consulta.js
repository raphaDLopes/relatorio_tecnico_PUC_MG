import {EntitySchema} from 'typeorm'


export class Consulta{
    constructor(horaInicio,horaFim, conteudo, atendimentoIndividualId, voluntarioId,  atendidoId, diaSemana)
    {
        this.horaInicio = horaInicio,
        this.horaFim = horaFim,
        this.orientacao = conteudo,
        this.atendimentoIndividualId = atendimentoIndividualId,
        this.voluntarioId = voluntarioId,
        this.atendidoId = atendidoId,
        this.diaSemana = diaSemana
    }
}

export default new EntitySchema ({
    name: 'Consulta',
    target: Consulta,
    columns:{
        id: {
            primary:true,
            type: 'int',
            generated: true
        },
        orientacao:{
            type: 'varchar'
        },
        horaInicio:{
            type: 'time',
            nullable: false
        },
        horaFim:{
            type: 'time',
            nullable: false
        },
        diaSemana:{
            type: 'int',
            nullable: false
        },
        voluntarioId:{
            type:'int',
            nullable: false
        },
        atendimentoIndividualId:{
            type:'int',
            nullable: false
        },
        atendidoId:{
            type:'int',
            nullable: false
        }
    },
    relations: {
        voluntario: {
          target: "Voluntario",
          type: "many-to-one",
          joinColumn: {
            name: "voluntarioId",
            referencedColumnName: "id",
        },
          cascade: true,
        },
        atendido: {
            target: "Atendido",
            type: "many-to-one",
            joinColumn: {
                name: "atendidoId",
                referencedColumnName: "id",
            },
            cascade: true
        },
        atendimentoColetivo: {
            target: "AtendimentoIndividual",
            type: "many-to-one",
            joinColumn: {
                name: "atendimentoIndividualId",
                referencedColumnName: "id",
            },
            joinColumn: true,
            cascade: true,
        }
    }

});