import {EntitySchema} from 'typeorm'


export class AtendimentoIndividual{
    constructor(id,descricao)
    {
        this.id = id
        this.descricao= descricao
    }
}

export default new EntitySchema ({
    name: 'AtendimentoIndividual',
    target: AtendimentoIndividual,
    columns:{
        id: {
            primary:true,
            type: 'int',
            generated: true
        },
        descricao:{
            type: 'varchar'
        },
    },
    relations: {
        consulta: {
            target: "Consulta",
            type: "one-to-many",
            inverseSide: "atendimentoIndividual",
            cascade: true,
          },
      }

});