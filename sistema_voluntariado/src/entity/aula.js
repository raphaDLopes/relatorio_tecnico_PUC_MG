import {EntitySchema} from 'typeorm'


export class Aula{
    constructor(id,conteudo, horaInicio, horaFim, diaSemana,turmaId,voluntarioId,atendimentoColetivoId)
    {
        this.id = id
        this.conteudo= conteudo
        this.horaInicio= horaInicio
        this.horaFim= horaFim
        this.diaSemana= diaSemana
        this.turmaId= turmaId
        this.voluntarioId= voluntarioId
        this.atendimentoColetivoId= atendimentoColetivoId
    }
}

export default new EntitySchema ({
    name: 'Aula',
    target: Aula,
    columns:{
        id: {
            primary:true,
            type: 'int',
            generated: true
        },
        conteudo:{
            type: 'varchar'
        },
        horaInicio:{
            type: 'time',
            nullable: true
        },
        horaFim:{
            type: 'time',
            nullable: true
        },
        diaSemana:{
            type: 'int',
            nullable: true
        },
        turmaId:{
            type:'int',
            nullable: false
        },
        voluntarioId:{
            type:'int',
            nullable: false
        },
        atendimentoColetivoId:{
            type:'int',
            nullable: false
        }
    },

    relations: {
        turma: 
        {
          target: "Turma",
          type: "many-to-one",
          joinColumn: 
          {
            name: "turmaId",
            referencedColumnName: "id",
          },
          cascade: true
        },
        voluntario: 
        {
          target: "Voluntario",
          type: "many-to-one",
          joinColumn: 
          {
            name: "voluntarioId",
            referencedColumnName: "id",
          },
          cascade: true
        },
        atendimentoColetivo: {
            target: "AtendimentoColetivo",
            type: "many-to-one",
            joinColumn: {
                name: "atendimentoColetivoId",
                referencedColumnName: "id",
            },
            cascade: true,
        }
    }

});