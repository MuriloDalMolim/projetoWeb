import React, { useEffect, useState } from 'react';
import api from '../../api/api';

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPacientes = async () => {
    try {
      const response = await api.get('/pacientes');
      setPacientes(response.data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar pacientes:', err);
      setError('Erro ao buscar pacientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', color: '#2563eb', fontSize: '1.125rem', marginTop: '2rem' }}>Carregando pacientes...</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '1.125rem', marginTop: '2rem' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937', textAlign: 'center' }}>Lista de Pacientes</h2>
      {pacientes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '1.125rem' }}>Nenhum paciente encontrado.</p>
      ) : (
        <ul style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem', listStyle: 'none', margin: 0 }}>
          {pacientes.map(paciente => (
            <li key={paciente.id} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', paddingTop: '0.75rem', color: '#374151' }}>
              <span style={{ fontWeight: '600' }}>{paciente.nome}</span> - CPF: {paciente.cpf} - Telefone: {paciente.telefone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}