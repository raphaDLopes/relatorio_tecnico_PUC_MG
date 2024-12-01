import React, { useState, useEffect } from 'react';

const DetalhesAtendido = ({ atendido, onClose }) => {

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
        
        if (atendido) {
            setNome(atendido.nome);
            setCpf(atendido.cpf);
            setEmail(atendido.email);
            setCelular(atendido.celular);
            setTelefone(atendido.telefone);
            setEndereco(atendido.endereco);
            setCidade(atendido.cidade);
            setBairro(atendido.bairro);
            setComplementoEndereco(atendido.complementoEndereco);
            setCep(atendido.cep);
            setMatricula(atendido.matricula);
        } else {
            setNome('');
        }
    }, [atendido]);

    return (
        <div>
            <h2>Detalhes do Atendido</h2>
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
    );


};

export default DetalhesAtendido;