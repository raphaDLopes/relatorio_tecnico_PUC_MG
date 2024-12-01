import {EntitySchema} from 'typeorm'


export class Turma{
    constructor(id,numero,maximoAlunos)
    {
        this.id = id
        this.numero= numero,
        this.maximoAlunos = maximoAlunos
    }
}

export default new EntitySchema ({
    name: 'Turma',
    target: Turma,
    columns:{
        id: {
            primary:true,
            type: 'int',
            generated: true
        },
        numero:{
            type: 'varchar'
        },
        maximoAlunos: {
            type: 'int'
        }
    },
    relations: {
        aula: {
            target: "Aula",
            type: "one-to-many",
            inverseSide: "turma"
        },
      }

});