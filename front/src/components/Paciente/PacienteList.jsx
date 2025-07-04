import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function PacienteList() {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  const fetchPacientes = async () => {
    try {
      const res = await api.get('/pacientes');
      setPacientes(res.data);
    } catch (err) {
      alert('Erro ao buscar pacientes');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await api.delete(`/pacientes/${id}`);
        alert('Paciente excluído com sucesso!');
        fetchPacientes();
      } catch (err) {
        alert('Erro ao excluir paciente');
        console.error(err);
      }
    }
  };

  return (
    <div style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Lista de Pacientes</h2>
      <button
        onClick={() => navigate("/pacientes/novo")}
        style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', marginBottom: '1.5rem' }}
      >
        Adicionar Paciente
      </button>
      {pacientes.length === 0 ? (
        <p style={{ color: '#4b5563' }}>Nenhum paciente encontrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {pacientes.map(paciente => (
            <li key={paciente.id} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', paddingTop: '1rem' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Nome: {paciente.nome}</p>
              <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>CPF: {paciente.cpf}</p>
              {/* Removido: Email e Telefone, que não estavam no seu PatientForm anterior */}
              <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>Telefone: {paciente.telefone}</p>
              <div style={{ marginTop: '0.75rem' }}>
                <button
                  onClick={() => navigate(`/pacientes/${paciente.id}`)}
                  style={{ backgroundColor: '#f59e0b', color: 'white', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginRight: '0.5rem' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(paciente.id)}
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