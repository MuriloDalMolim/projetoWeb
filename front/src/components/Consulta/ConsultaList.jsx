import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function ConsultaList() {
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  const reverseStatusMap = {
    'A': 'Agendada',
    'C': 'Confirmada',
    'R': 'Realizada',
    'X': 'Cancelada'
  };

  const fetchConsultas = async () => {
    try {
      const res = await api.get('/consultas');
      setConsultas(res.data);
    } catch (err) {
      alert('Erro ao buscar consultas');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta consulta?')) {
      try {
        await api.delete(`/consultas/${id}`);
        alert('Consulta excluída com sucesso!');
        fetchConsultas();
      } catch (err) {
        alert('Erro ao excluir consulta');
        console.error(err);
      }
    }
  };

  return (
    <div style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Lista de Consultas</h2>
      <button
        onClick={() => navigate("/consultas/novo")}
        style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', marginBottom: '1.5rem' }}
      >
        Agendar Nova Consulta
      </button>
      {consultas.length === 0 ? (
        <p style={{ color: '#4b5563' }}>Nenhuma consulta encontrada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {consultas.map(consulta => (
            <li key={consulta.id} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', paddingTop: '1rem' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Paciente ID: {consulta.idPaciente}</p>
              <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>Médico ID: {consulta.idMedico}</p>
              <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>Local: {consulta.local}</p>
              {consulta.data && <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>Data: {new Date(consulta.data).toLocaleDateString()}</p>}
              <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>Status: {reverseStatusMap[consulta.status] || consulta.status}</p>
              <div style={{ marginTop: '0.75rem' }}>
                <button
                  onClick={() => navigate(`/consultas/${consulta.id}`)}
                  style={{ backgroundColor: '#f59e0b', color: 'white', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginRight: '0.5rem' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(consulta.id)}
                  style={{ backgroundColor: '#dc2626', color: 'white', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => navigate('/home')}
        style={{ backgroundColor: '#6b7280', color: 'white', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', marginTop: '1.5rem' }}
      >
        Voltar
      </button>
    </div>
  );
}