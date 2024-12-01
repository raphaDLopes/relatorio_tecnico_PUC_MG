import {EntitySchema} from 'typeorm'


export class AgendaVoluntario{
    constructor(diaSemana,horaInicio,horaFim)
    {
        this.diaSemana = diaSemana,
        this.horaInicio = horaInicio,
        this.horaFim = horaFim
    }
}

export default new EntitySchema ({
    name: 'AgendaVoluntario',
    target: AgendaVoluntario,
    columns:{
        id: {
            primary:true,
            type: 'int',
            generated: true
        },
        diaSemana:{
            type: 'varchar'
        },
        horaInicio:{
            type: 'time',
            nullable: false,
            default: '09:00:00'
        },
        horaFim:{
            type: 'time',
            nullable: false,
            default: '18:00:00'
        },
        voluntarioId:{
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
            cascade: true
        }
      }
});