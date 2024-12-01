import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastroUsuario = ({ usuario, onClose, onRefresh }) => {
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
   
    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome);
            setLogin(usuario.login);
            setSenha(usuario.senha);
        } else {
            setNome('');
        }
    }, [usuario]);

    const token = sessionStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            let headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            if (usuario) {
                await axios.put(`http://localhost:4000/user/`, {nome, login, senha }, headers);
            } else {
                await axios.post('http://localhost:4000/user/', {nome, login, senha}, headers);
            }
            onRefresh();
            onClose();
        } catch (error) {
            console.error("Erro ao salvar usuario:", error);
        }
    };

    return (
        <div className='div-cadastro-section'>
            <h2>{usuario ? 'Alterar Usuario' : 'Novo Usuario'}</h2>
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
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)} 
                    placeholder="login" 
                    required 
                />
                 <input 
                    type="password" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    placeholder="senha" 
                    required 
                />
                <button type="submit">{usuario ? 'Alterar' : 'Cadastrar'}</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default CadastroUsuario;
