import {EntitySchema} from 'typeorm'


export class AtendimentoColetivo{
    constructor(id,descricao)
    {
        this.id = id
        this.descricao= descricao
    }
}

export default new EntitySchema ({
    name: 'AtendimentoColetivo',
    target: AtendimentoColetivo,
    columns:{
        id: {
            primary:true,
            type: 'int',
            generated: true
        },
        descricao:{
            type: 'varchar'
        }
    },

    relations: {
        aula: {
          target: "Aula",
          type: "one-to-many",
          inverseSide: "atendimentoColetivo"
        },
      }

});