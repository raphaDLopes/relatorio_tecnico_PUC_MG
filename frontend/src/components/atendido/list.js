import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CadastroAtendido from './create.js';
import DetalhesAtendido from './detalhes.js';
import ConfirmModal from '../modal.js'

const ListAtendidos = () => {
    const [showModal, setShowModal] = useState(false);
    const [atendidos, setAtendidos] = useState([]);
    const [selectedAtendido, setSelectedAtendido] = useState(null);
    const [showCadastro, setShowCadastro] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showDetalhesAtendido, setShowDetalhesAtendido] = useState(false);
    const [showList, setShowList] = useState(true);


    const token = sessionStorage.getItem('token');

    const fetchAtendidos = async () => {
        try {


            const response = await axios.get('http://localhost:4000/atendido/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)
            setAtendidos(response.data);
        } catch (error) {
            console.error('Erro ao buscar atendidos:', error.response ? error.response.data : error.message);
                    }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/atendido/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchAtendidos();
            setShowModal(false); 
            setDeleteId(null);
        } catch (error) {
            console.error("Erro ao excluir atendido:", error);
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const handleEdit = (atendido) => {
        setSelectedAtendido(atendido);
        setShowCadastro(true);
    };

    const handleDetalhes = (atendido) => {
        setSelectedAtendido(atendido);
        setShowDetalhesAtendido(true); 
        setShowList(false);
    };

    useEffect(() => {
        fetchAtendidos();
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
            <h2>Lista de Atendidos</h2>
            <div className='div-button-cadastro-section'>
            <div className='div-button-cadastro-group'>
                
            <button onClick={() => setShowCadastro(true)}>Novo Atendido</button>
            </div>
            </div>
            {showCadastro && (
                <CadastroAtendido 
                    atendido={selectedAtendido} 
                    onClose={() => { setShowCadastro(false); setSelectedAtendido(null); }} 
                    onRefresh={fetchAtendidos} 
                />
            )}
            {showDetalhesAtendido && (
                <DetalhesAtendido 
                    atendido={selectedAtendido} 
                    onClose={() => setShowDetalhesAtendido(false)}
                />
            )}
            <ul>
                {atendidos.map(atendido => (
                    <li style={{listStyle:"none"}} key={atendido.id}>
                        <div className="button-section">
                        <a href="#" style={{textDecoration:"none", textTransform: "capitalize"}} onClick={(e) => { e.preventDefault(); handleDetalhes(atendido); }}>
                            <h3>{atendido.nome}</h3>
                        </a>
                        <div className="button-group">
                            <button  onClick={() => handleEdit(atendido)}>Alterar</button>
                            <button  onClick={() => handleDelete(atendido.id)}>Excluir</button>
                        </div>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default ListAtendidos;