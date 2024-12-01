import {EntitySchema} from 'typeorm'


export class User{
    constructor(id,login, senha, nome)
    {
        this.id = id
        this.login = login;
        this.senha = senha;
        this.nome = nome;
    }
}

export default new EntitySchema ({
    name: 'User',
    target: User,
    columns:{
        id: {
            primary:true,
            type: 'int',
            generated: true
        },
        nome:{
            type: 'varchar'
        },
        login:{
            type: 'varchar'
        },
        senha:{
            type: 'varchar'
        }
    }

});