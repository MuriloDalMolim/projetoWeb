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

  if (loading) return <p>Carregando consultas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Consultas</h2>
      <ul>
        {consultas.map(consulta => (
          <li key={consulta.id}>
            Consulta ID: {consulta.id} - Local: {consulta.local} - Status: {consulta.status} - Data: {consulta.data}
          </li>
        ))}
      </ul>
    </div>
  );
}
