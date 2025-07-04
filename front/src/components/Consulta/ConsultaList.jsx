import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function ConsultaList() {
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  const fetchConsultas = async () => {
    try {
      const res = await api.get('/consultas');
      setConsultas(res.data);
    } catch {
      alert('Erro ao buscar consultas');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Confirmar exclusão?')) {
      await api.delete(`/consultas/${id}`);
      fetchConsultas();
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  return (
    <div>
      <h2>Consultas</h2>
      <button onClick={() => navigate('/consultas/novo')}>Nova Consulta</button>
      <ul>
        {consultas.map(c => (
          <li key={c.id}>
            Paciente ID: {c.idPaciente} - Médico ID: {c.idMedico} - Local: {c.local} - Status: {c.status} - Data: {c.data}
            {' '}
            <button onClick={() => navigate(`/consultas/${c.id}`)}>Editar</button>
            {' '}
            <button onClick={() => handleDelete(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
