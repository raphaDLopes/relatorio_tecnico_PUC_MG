export default {
    msgSucesso: (local = "")=>{
        return local + " Sucesso na requisição."
    },
    msgFalha: (local = "")=>{
        return local + " Ocorreu um erro no processamento."
    },
    msgNaoEncontrado: (local = "")=>{
        return local + " Não encontrado."
    },
    msgErroAula:(codigoMsg)=>{
        let msg = ""
        let codRetorno = 0
        switch(codigoMsg) {
            case 0:
                msg = "Já existe uma aula para o voluntario neste horário."
                codRetorno = 401
                break;
            case 1:
                msg = "Horário incompatível."
                codRetorno = 402
                break;
            case 2:
                msg = "O voluntário não possui agenda cadastrada."
                codRetorno = 403
                break;
            case 3:
                msg = "Voluntário não encontrado."
                codRetorno = 405
                break;
            case 4:
                msg = "Atividade coletiva não encontrada."
                codRetorno = 406
                break;
            case 5:
                msg = "Turma não encontrada."
                codRetorno = 407
                break;
            case 6:
                msg = "Aula não encontrada."
                codRetorno = 409
                break;
            case 7:
                msg = "Já existe uma aula para a turma ocupando esse horário."
                codRetorno = 409
                break;
            case 8:
                msg = "O horário do início da aula não pode ser maior ou igual ao do final."
                codRetorno = 413
                break;
            default:
          }
          return msg
    },
    msgErroConsulta:(codigoMsg)=>{
        let msg = ""
        let codRetorno = 0
        switch(codigoMsg) {
            case 0:
                msg = "Consulta não encontrada."
                codRetorno = 404
                break;
            case 1:
                msg = "Atividade individual não encontrada."
                codRetorno = 405
                break;
            case 2:
                msg = "Voluntário não encontrado."
                codRetorno = 406
                break;
            case 3:
                msg = "Atendido não encontrado."
                codRetorno = 407
                break;
            case 4:
                msg = "Já existe uma consulta para o atendido nesse horário."
                codRetorno = 408
                break;
            case 5:
                msg = "Já existe uma aula para o atendido nesse horário."
                codRetorno = 409
                break;
            case 6:
                msg = "Já existe uma aula para o voluntário nesse horário."
                codRetorno = 410
                break;
            case 7:
                msg = "Já existe uma consulta para o voluntário nesse horário."
                codRetorno = 411
                break;
            case 8:
                msg = "Horário incompatível com a agenda do voluntário."
                codRetorno = 412
                break;
            case 9:
                msg = "O horário do início da consulta não pode ser maior ou igual ao do final."
                codRetorno = 413
                break;  
            
            default:

        }
        return msg
    },
    msgErroUser: (codigoMsg)=>{
        let msg = ""
        let codRetorno = 0
        switch(codigoMsg) {
            case 0:
                msg = "Nome de usuário e senha são obrigatórios."
                codRetorno = 402
                break;
            case 1:
                msg = "Usuário já existe."
                codRetorno = 402
                break;
            case 2:
                msg = "Usuário ou senha inválidos."
                codRetorno = 401
                break; 
            case 3:
                msg = "Usuário ou senha inválidos."
                codRetorno = 401
                break;                  
            default:
        }
        return {
            codRetorno,
            msg
        }
    }
}