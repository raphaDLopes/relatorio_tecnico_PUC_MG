import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CadastroVoluntario from './create.js';
import DetalhesVoluntario from './detalhes.js';
import ConfirmModal from '../modal.js'

const ListVoluntarios = () => {
    const [showModal, setShowModal] = useState(false);
    const [voluntarios, setVoluntarios] = useState([]);
    const [selectedVoluntario, setSelectedVoluntario] = useState(null);
    const [showCadastro, setShowCadastro] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showDetalhesVoluntario, setShowDetalhesVoluntario] = useState(false);
    const [showList, setShowList] = useState(true);

    const fetchVoluntarios = async () => {
        try {
            const token = sessionStorage.getItem('token');

            const response = await axios.get('http://localhost:4000/voluntario/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)
            setVoluntarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar atendidos:', error.response ? error.response.data : error.message);
                    }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/voluntario/${deleteId}`);
            fetchVoluntarios();
            setShowModal(false); 
            setDeleteId(null);
        } catch (error) {
            console.error("Erro ao excluir voluntario:", error);
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const handleEdit = (voluntario) => {
        setSelectedVoluntario(voluntario);
        setShowCadastro(true);
    };

    const handleDetalhes = (voluntario) => {
        setSelectedVoluntario(voluntario);
        setShowDetalhesVoluntario(true);
        setShowList(false);
    };

    useEffect(() => {
        fetchVoluntarios();
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
            <div className='div-conteudo'>
            <div className='div-button-cadastro-section'>
            <div className='div-button-cadastro-group'>
                
            <button onClick={() => setShowCadastro(true)}>Novo Voluntario</button>
            </div>
            </div>
            {showCadastro && (
                <CadastroVoluntario 
                    voluntario={selectedVoluntario} 
                    onClose={() => { setShowCadastro(false); setSelectedVoluntario(null); }} 
                    onRefresh={fetchVoluntarios} 
                />
            )}
            {showDetalhesVoluntario && (
    <DetalhesVoluntario 
        voluntario={selectedVoluntario} 
        onClose={() => {
            setShowDetalhesVoluntario(false);
            setShowList(true); // Reexibe a lista ao fechar os detalhes
        }}
    />
)}

            {/* {showDetalhesVoluntario && (
                <DetalhesVoluntario 
                    voluntario={selectedVoluntario} 
                    onClose={() => setShowDetalhesVoluntario(false)}
                />
            )} */}
            {/* {showDetalhesVoluntario showCadastro } */}
            {/* <ul>
                {voluntarios.map(voluntario => (
                    <li style={{listStyle:"none"}} key={voluntario.id}>
                        <div className="button-section">
                        <a href="#" style={{textDecoration:"none", textTransform: "capitalize"}} onClick={(e) => { e.preventDefault(); handleDetalhes(voluntario); }}>
                            <h3>{voluntario.nome}</h3>
                        </a>
                        <div className="button-group">
                            <button  onClick={() => handleEdit(voluntario)}>Alterar</button>
                            <button  onClick={() => handleDelete(voluntario.id)}>Excluir</button>
                        </div>
                        </div>
                        
                    </li>
                ))}
            </ul> */}

{showList && (<>
            <h2>Lista de Voluntarios</h2>

    <ul>
        {voluntarios.map(voluntario => (
            <li style={{ listStyle: "none" }} key={voluntario.id}>
                <div className="button-section">
                    <a
                        href="#"
                        style={{ textDecoration: "none", textTransform: "capitalize" }}
                        onClick={(e) => { e.preventDefault(); handleDetalhes(voluntario); }}
                    >
                        <h3>{voluntario.nome}</h3>
                    </a>
                    <div className="button-group">
                        <button onClick={() => handleEdit(voluntario)}>Alterar</button>
                        <button onClick={() => handleDelete(voluntario.id)}>Excluir</button>
                    </div>
                </div>
            </li>
        ))}
    </ul>
    </>
)}
        </div>
        </div>
    );
};



export default ListVoluntarios;