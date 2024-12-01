import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastroVoluntario = ({ voluntario, onClose, onRefresh }) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (voluntario) {
                await axios.put(`http://localhost:4000/voluntario/`,  {nome, cpf, celular, telefone, endereco, bairro, cidade, complementoEndereco, cep, matricula, email} );
            } else {
                await axios.post('http://localhost:4000/voluntario/', {nome, cpf, celular, telefone, endereco, bairro, cidade, complementoEndereco, cep, matricula, email});
            }
            onRefresh();
            onClose();
        } catch (error) {
            console.error("Erro ao salvar voluntario:", error);
        }
    };

    return (
        <div className='div-cadastro-section'>
            <h2>{voluntario ? 'Alterar Voluntario' : 'Novo Voluntario'}</h2>
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

                <button type="submit">{voluntario ? 'Alterar' : 'Cadastrar'}</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default CadastroVoluntario;
