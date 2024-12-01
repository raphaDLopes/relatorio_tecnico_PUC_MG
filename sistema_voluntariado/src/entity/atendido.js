import {EntitySchema} from 'typeorm'


export class Atendido{
    constructor(id,matricula, nome, cpf,dataNascimento,email, telefone, celular, endereco, cidade, bairro, complementoEndereco, cep)
    {
        this.id = id
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.telefone = telefone;
        this.celular = celular;
        this.endereco = endereco;
        this.cidade = cidade;
        this.bairro = bairro;
        this.complementoEndereco = complementoEndereco;
        this.cep = cep;
        this.matricula = matricula
    }
}

export default new EntitySchema ({
    name: 'Atendido',
    target: Atendido,
    columns:{
        id: {
            primary:true,
            type: 'int',
            generated: true
        },
        matricula:{
            type: 'varchar'
        },
        nome:{
            type: 'varchar'
        },
        cpf:{
            type: 'varchar'
        },
        email:{
            type: 'varchar'
        },
        telefone:{
            type: 'varchar'
        },
        celular:{
            type: 'varchar'
        },
        endereco:{
            type: 'varchar'
        },
        cidade:{
            type: 'varchar'
        },
        bairro:{
            type: 'varchar'
        },
        complementoEndereco:{
            type: 'varchar'
        },
        cep:{
            type: 'varchar'
        }
    },

    relations: {
        turma: {
            type: 'many-to-many',
            target: 'Turma',
            joinTable: {
                name: "atendido_turma",
                joinColumn: {
                  name: "atendidoId",
                  referencedColumnName: "id",
                },
                inverseJoinColumn: {
                  name: "turmaId",
                  referencedColumnName: "id",
                },
              },
          },
        consulta: {
            target: "Consulta",
            type: "one-to-many",
            inverseSide: "Atendido",
            cascade: true,
        },
      }
});