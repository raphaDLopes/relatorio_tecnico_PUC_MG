import React, { useState, useEffect } from 'react';
import ListAgendaVoluntario from '../agendaVoluntario/list.js';

const DetalhesVoluntario = ({ voluntario, onClose }) => {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [complementoEndereco, setComplementoEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [matricula, setMatricula] = useState('');

    useEffect(() => {
        
        if (voluntario) {
            setNome(voluntario.nome);
            setCpf(voluntario.cpf);
            setEmail(voluntario.email);
            setCelular(voluntario.celular);
            setTelefone(voluntario.telefone);
            setEndereco(voluntario.endereco);
            setCidade(voluntario.cidade);
            setBairro(voluntario.bairro);
            setComplementoEndereco(voluntario.complementoEndereco);
            setCep(voluntario.cep);
            setMatricula(voluntario.matricula);
        } else {
            setNome('');
        }
    }, [voluntario]);

    return (
       <>
            <div>
                <h2>Informações do Voluntario</h2>
                <form>
                    <input type="text" value={nome} readOnly placeholder="Nome" />
                    <input type="text" value={cpf} readOnly placeholder="CPF" />
                    <input type="text" value={email} readOnly placeholder="E-mail" />
                    <input type="text" value={telefone} readOnly placeholder="Telefone" />
                    <input type="text" value={celular} readOnly placeholder="Celular" />
                    <input type="text" value={endereco} readOnly placeholder="Endereço" />
                    <input type="text" value={cidade} readOnly placeholder="Cidade" />
                    <input type="text" value={bairro} readOnly placeholder="Bairro" />
                    <input type="text" value={complementoEndereco} readOnly placeholder="Complemento" />
                    <input type="text" value={cep} readOnly placeholder="CEP" />
                    <input type="text" value={matricula} readOnly placeholder="Matrícula" />
                </form>
                <button onClick={onClose}>Fechar</button>
            </div>
            <ListAgendaVoluntario voluntarioId = {voluntario.id}/>

        </>
    );

    
};

export default DetalhesVoluntario;