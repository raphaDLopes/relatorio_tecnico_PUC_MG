// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, senha }),
            });

            if (response.ok) {
                const token = await response.json();
                sessionStorage.setItem('token', token); 
                navigate('/home');
            } else {
                alert('Login falhou! Verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Ocorreu um erro. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Usuário:</label>
                    <input 
                        type="text" 
                        value={login} 
                        onChange={(e) => setLogin(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input 
                        type="password" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;