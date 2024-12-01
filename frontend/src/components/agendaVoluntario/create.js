import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastroAgendaVoluntario = ({ agendaVoluntario, onClose, onRefresh }) => {
    const [diaSemana, setDiaSemana] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horafim, setHorafim] = useState('');
    const [vountarioId, setVountarioId] = useState('');
   


    useEffect(() => {
        if (agendaVoluntario) {
            setDiaSemana(agendaVoluntario.diaSemana);
            setHoraInicio(agendaVoluntario.horaInicio);
            setHorafim(agendaVoluntario.horafim);
            setVountarioId(agendaVoluntario.vountarioId);
        } else {
            setDiaSemana('');
        }
    }, [agendaVoluntario]);

    const token = sessionStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            let headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            if (agendaVoluntario) {
                await axios.put(`http://localhost:4000/user/`, {diaSemana, horaInicio, horafim}, headers );
            } else {
                await axios.post('http://localhost:4000/user/', {diaSemana, horaInicio, horafim}, headers);
            }
            onRefresh();
            onClose();
        } catch (error) {
            console.error("Erro ao salvar a agenda do voluntario:", error);
        }
    };

    return (
        <div className='div-cadastro-section'>
            <h2>{agendaVoluntario ? 'Alterar Agenda do Voluntario' : 'Novo Agenda do Voluntario'}</h2>
            <form onSubmit={handleSubmit}>
                 <select id="options" value={diaSemana}>
                    <option value="1">Segunda-feira</option>
                    <option value="2">Terça-feira</option>
                    <option value="3">Quarta-feira</option>
                    <option value="4">Quinta-feira</option>
                    <option value="5">Sexta-feira</option>
                    <option selected value="6">Sábado</option>
                    <option value="0">Domingo</option>
                 </select>
                 <input 
                    type="text" 
                    value={horaInicio} 
                    onChange={(e) => setHoraInicio(e.target.value)} 
                    placeholder="Horario de entrada" 
                    required 
                />
                 <input 
                    type="text" 
                    value={horafim} 
                    onChange={(e) => setHorafim(e.target.value)} 
                    placeholder="Horario de saída" 
                    required 
                />
                
                <button type="submit">{agendaVoluntario ? 'Alterar' : 'Cadastrar'}</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default CadastroAgendaVoluntario;
