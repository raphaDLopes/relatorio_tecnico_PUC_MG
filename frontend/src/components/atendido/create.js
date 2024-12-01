import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastroAtendido = ({ atendido, onClose, onRefresh }) => {
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

    const token = sessionStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            let headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            if (atendido) {
                await axios.put(`http://localhost:4000/atendido/`, {nome, cpf, celular, telefone, endereco, bairro, cidade, complementoEndereco, cep, matricula, email}, headers );
            } else {
                await axios.post('http://localhost:4000/atendido/', {nome, cpf, celular, telefone, endereco, bairro, cidade, complementoEndereco, cep, matricula, email}, headers);
            }
            onRefresh();
            onClose();
        } catch (error) {
            console.error("Erro ao salvar atendido:", error);
        }
    };

    return (
        <div className='div-cadastro-section'>
            <h2>{atendido ? 'Alterar Atendido' : 'Novo Atendido'}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    placeholder="Nome" 
                    required 
                    className='input_nome'
                />
                 <input 
                    type="text" 
                    value={cpf} 
                    onChange={(e) => setCpf(e.target.value)} 
                    placeholder="CPF" 
                    required 
                />
                <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="E-mail" 
                    required 
                />
                <input 
                    type="text" 
                    value={telefone} 
                    onChange={(e) => setTelefone(e.target.value)} 
                    placeholder="Telefone" 
                    required 
                />
                <input 
                    type="text" 
                    value={celular} 
                    onChange={(e) => setCelular(e.target.value)} 
                    placeholder="Celular" 
                    required 
                />
                <input 
                    type="text" 
                    value={endereco} 
                    onChange={(e) => setEndereco(e.target.value)} 
                    placeholder="Endereco" 
                    required 
                />
                <input 
                    type="text" 
                    value={cidade} 
                    onChange={(e) => setCidade(e.target.value)} 
                    placeholder="Cidade" 
                    required 
                />
                 <input 
                    type="text" 
                    value={bairro} 
                    onChange={(e) => setBairro(e.target.value)} 
                    placeholder="Bairro" 
                    required 
                />  
                  <input 
                    type="text" 
                    value={complementoEndereco} 
                    onChange={(e) => setComplementoEndereco(e.target.value)} 
                    placeholder="Complemento" 
                    required 
                />  
                <input 
                    type="text" 
                    value={cep} 
                    onChange={(e) => setCep(e.target.value)} 
                    placeholder="Cep" 
                    required 
                />  
                <input 
                    type="text" 
                    value={matricula} 
                    onChange={(e) => setMatricula(e.target.value)} 
                    placeholder="Matricula" 
                    required 
                />                                

                <button type="submit">{atendido ? 'Alterar' : 'Cadastrar'}</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default CadastroAtendido;
