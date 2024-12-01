
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token'); 
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/'); 
    };

    return (
        <>
            {token && (
                <nav>
                    <Link to="/home">Home</Link>
                    <Link to="/atendido/list">Atendidos</Link>
                    <Link to="/voluntario/list">Voluntários</Link>
                    <Link to="/user/list">Usuários</Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
            )}
        </>
    );
};

export default Menu;