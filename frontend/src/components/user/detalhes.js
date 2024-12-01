import React, { useState, useEffect } from 'react';


const DetalhesUsuario = ({ usuario, onClose }) => {

    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    

    useEffect(() => {
        
        if (usuario) {
            setNome(usuario.nome);
            setLogin(usuario.login);
        } else {
            setNome('');
        }
    }, [usuario]);

    return (
        <div>
            <h2>Detalhes do Usuario</h2>
            <form>
                <input type="text" value={nome} readOnly placeholder="Nome" />
                <input type="text" value={login} readOnly placeholder="Nome de usuário" />
            </form>
            <button onClick={onClose}>Fechar</button>
        </div>
    );
};

export default DetalhesUsuario;