import React, { useEffect, useState } from 'react';
import api from '../../api/api';

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConsultas = async () => {
    try {
      const response = await api.get('/consultas');
      setConsultas(response.data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar consultas:', err);
      setError('Erro ao buscar consultas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', color: '#2563eb', fontSize: '1.125rem', marginTop: '2rem' }}>Carregando consultas...</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '1.125rem', marginTop: '2rem' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937', textAlign: 'center' }}>Lista de Consultas</h2>
      {consultas.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '1.125rem' }}>Nenhuma consulta encontrada.</p>
      ) : (
        <ul style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem', listStyle: 'none', margin: 0 }}>
          {consultas.map(consulta => (
            <li key={consulta.id} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', paddingTop: '0.75rem', color: '#374151' }}>
              <span style={{ fontWeight: '600' }}>Consulta ID: {consulta.id}</span> - Local: {consulta.local} - Status: {consulta.status} - Data: {consulta.data}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}