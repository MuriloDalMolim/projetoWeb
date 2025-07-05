import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function MedicoList() { 
  const [medicos, setMedicos] = useState([]);
  const navigate = useNavigate();

  const fetchMedicos = async () => {
    try {
      const res = await api.get('/medicos');
      setMedicos(res.data);
    } catch (err) {
      alert('Erro ao buscar médicos');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      try {
        await api.delete(`/medicos/${id}`);
        alert('Médico excluído com sucesso!');
        fetchMedicos();
      } catch (err) {
        alert('Erro ao excluir médico');
        console.error(err);
      }
    }
  };

  return (
    <div style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Lista de Médicos</h2>
      <button
        onClick={() => navigate("/medicos/novo")} 
        style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', marginBottom: '1.5rem' }}
      >
        Adicionar Médico
      </button>
      {medicos.length === 0 ? (
        <p style={{ color: '#4b5563' }}>Nenhum médico encontrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {medicos.map(medico => (
            <li key={medico.id} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', paddingTop: '1rem' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Nome: {medico.nome}</p>
              <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>CRM: {medico.crm}</p>
              <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>Especialidade: {medico.especialidade}</p>
              <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>Email: {medico.email}</p>
              <div style={{ marginTop: '0.75rem' }}>
                <button
                  onClick={() => navigate(`/medicos/${medico.id}`)} 
                  style={{ backgroundColor: '#f59e0b', color: 'white', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginRight: '0.5rem' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(medico.id)}
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