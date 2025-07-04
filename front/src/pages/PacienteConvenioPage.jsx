import React, { useEffect, useState } from 'react';
import api from '../../api/api';

export default function PacienteConveniosPage() {
  const [associacoes, setAssociacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssociacoes = async () => {
    try {
      const response = await api.get('/pacienteConvenios');
      console.log('Dados recebidos:', response.data);
      setAssociacoes(response.data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar associações paciente-convênio:', err);
      setError('Erro ao buscar associações paciente-convênio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssociacoes();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', color: '#2563eb', fontSize: '1.125rem', marginTop: '2rem' }}>Carregando associações paciente-convênio...</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '1.125rem', marginTop: '2rem' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937', textAlign: 'center' }}>Associações Paciente-Convênio</h2>
      {associacoes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '1.125rem' }}>Nenhuma associação encontrada.</p>
      ) : (
        <ul style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem', listStyle: 'none', margin: 0 }}>
          {associacoes.map(ass => (
            <li key={ass.id} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', paddingTop: '0.75rem', color: '#374151' }}>
              <span style={{ fontWeight: '600' }}>Paciente ID: {ass.idPaciente}</span> - Convênio ID: {ass.idConvenio} - Nº Plano: {ass.numeroPlano}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}