import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CadastroAgendaVoluntario from './create.js';
import DetalhesAgendaVoluntario from './detalhes.js';
import ConfirmModal from '../modal.js'

const ListAgendaVoluntarios = (voluntarioId) => {
    const [showModal, setShowModal] = useState(false);
    const [agendaVoluntarios, setAgendaVoluntarios] = useState([]);
    const [selectedAgendaVoluntario, setSelectedAgendaVoluntario] = useState(null);
    const [showCadastro, setShowCadastro] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showDetalhesAgendaVoluntario, setShowDetalhesAgendaVoluntario] = useState(false);
    // const [showList, setShowList] = useState(true);


    const token = sessionStorage.getItem('token');

    const fetchAgendaVoluntarios = async (voluntarioId) => {
        try {

            console.log("11111111111111")
            console.log(voluntarioId)

            const response = await axios.get(`http://localhost:4000/agendaVoluntario?voluntarioId=${voluntarioId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAgendaVoluntarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar as agendas:', error.response ? error.response.data : error.message);
                    }
    };

    const confirmDelete = async (voluntarioId) => {
        try {
            await axios.delete(`http://localhost:4000/agendaVoluntario/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchAgendaVoluntarios(voluntarioId);
            setShowModal(false); 
            setDeleteId(null);
        } catch (error) {
            console.error("Erro ao excluir a agenda do voluntario:", error);
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const handleEdit = (agendaVoluntario) => {
        setSelectedAgendaVoluntario(agendaVoluntario);
        setShowCadastro(true);
    };

    useEffect(() => {
        fetchAgendaVoluntarios();
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
            <h2>Agenda do Voluntário</h2>
            <div className='div-button-cadastro-section'>
            <div className='div-button-cadastro-group'>
                
            <button onClick={() => setShowCadastro(true)}>Nova agenda</button>
            </div>
            </div>
            {showCadastro && (
                <CadastroAgendaVoluntario 
                    agendaVoluntario={selectedAgendaVoluntario} 
                    onClose={() => { setShowCadastro(false); setSelectedAgendaVoluntario(null); }} 
                    onRefresh={fetchAgendaVoluntarios} 
                />
            )}
            {showDetalhesAgendaVoluntario && (
                <DetalhesAgendaVoluntario 
                    agendaVoluntario={selectedAgendaVoluntario} 
                    onClose={() => setShowDetalhesAgendaVoluntario(false)}
                />
            )}
            <ul>
                {agendaVoluntarios.map(agendaVoluntario => (
                    <li style={{listStyle:"none"}} key={agendaVoluntario.id}>
                        <div className="button-section">
                        {/* <a href="#" style={{textDecoration:"none", textTransform: "capitalize"}} onClick={(e) => { e.preventDefault(); handleDetalhes(agendaVoluntario); }}>
                            <h3>{agendaVoluntario.nome}</h3>
                        </a> */}
                        <div className='div-data-group'>
                            <select id="options" readOnly value={agendaVoluntario.diaSemana}>
                                <option value="1">Segunda-feira</option>
                                <option value="2">Terça-feira</option>
                                <option value="3">Quarta-feira</option>
                                <option value="4">Quinta-feira</option>
                                <option value="5">Sexta-feira</option>
                                <option value="6">Sábado</option>
                                <option value="0">Domingo</option>
                            </select>
                            <div className='div-data-hours'>
                                <input type="text" value={agendaVoluntario.horaInicio} readOnly placeholder="Hora inicial" />
                                <input type="text" value={agendaVoluntario.horaFim} readOnly placeholder="Hora Final" />
                            </div>
                        </div>
                        <div className="button-group">
                            <button  onClick={() => handleEdit(agendaVoluntario)}>Alterar</button>
                            <button  onClick={() => handleDelete(agendaVoluntario.id)}>Excluir</button>
                        </div>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default ListAgendaVoluntarios;