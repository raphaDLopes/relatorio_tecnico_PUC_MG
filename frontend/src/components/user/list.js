import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CadastroUsuario from './create.js';
import DetalhesUsuario from './detalhes.js';
import ConfirmModal from '../modal.js'

const ListUsuarios = () => {
    const [showModal, setShowModal] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [showCadastro, setShowCadastro] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showDetalhesUsuario, setShowDetalhesUsuario] = useState(false);
    // const [showList, setShowList] = useState(true);


    const token = sessionStorage.getItem('token');

    const fetchUsuarios = async () => {
        try {


            const response = await axios.get('http://localhost:4000/user/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuarios:', error.response ? error.response.data : error.message);
                    }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/user/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchUsuarios();
            setShowModal(false); 
            setDeleteId(null);
        } catch (error) {
            console.error("Erro ao excluir usuario:", error);
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const handleEdit = (usuario) => {
        setSelectedUsuario(usuario);
        setShowCadastro(true);
    };

    const handleDetalhes = (usuario) => {
        setSelectedUsuario(usuario);
        setShowDetalhesUsuario(true); 
        // setShowList(false);
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <div className='list_page'>
            <div className='section_list'>
            {/* ... */}
            <ConfirmModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
            />
            </div>
            <h2>Lista de Usuarios</h2>
            <div className='div-button-cadastro-section'>
            <div className='div-button-cadastro-group'>
                
            <button onClick={() => setShowCadastro(true)}>Novo Usuario</button>
            </div>
            </div>
            {showCadastro && (
                <CadastroUsuario 
                    usuario={selectedUsuario} 
                    onClose={() => { setShowCadastro(false); setSelectedUsuario(null); }} 
                    onRefresh={fetchUsuarios} 
                />
            )}
            {showDetalhesUsuario && (
                <DetalhesUsuario 
                    usuario={selectedUsuario} 
                    onClose={() => setShowDetalhesUsuario(false)}
                />
            )}
            <ul>
                {usuarios.map(usuario => (
                    <li style={{listStyle:"none"}} key={usuario.id}>
                        <div className="button-section">
                        <a href="#" style={{textDecoration:"none", textTransform: "capitalize"}} onClick={(e) => { e.preventDefault(); handleDetalhes(usuario); }}>
                            <h3>{usuario.nome}</h3>
                        </a>
                        <div className="button-group">
                            <button  onClick={() => handleEdit(usuario)}>Alterar</button>
                            <button  onClick={() => handleDelete(usuario.id)}>Excluir</button>
                        </div>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default ListUsuarios;