import {EntitySchema} from 'typeorm'

export class TurmaAtendido{
    constructor(atendidoId,turmaId)
    {
        this.atendidoId = atendidoId
        this.turmaId = turmaId
    }
}

export default new EntitySchema ({
    name: 'turmaAtendido',
    target: TurmaAtendido,
    columns: {
        atendidoId: { 
            type: 'int', 
            primary: true 
          },
          turmaId: { 
            type: 'int', 
            primary: true 
        },
      },
      primary: {
        columns: ['atendidoId', 'turmaId'],
      },
    relations: {
        atendido: {
          type: "many-to-one",
          target: "Atendido",
          inverseSide: 'turma'
        },
        turma: {
          type: 'many-to-one',
          target: 'Turma',
          inverseSide: 'atendido'
        }
    }

});