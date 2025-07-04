import React, { useEffect, useState } from 'react';
import api from '../../api/api';

export default function ConveniosPage() {
  const [convenios, setConvenios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConvenios = async () => {
    try {
      const response = await api.get('/convenios');
      setConvenios(response.data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar convênios:', err);
      setError('Erro ao buscar convênios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  if (loading) return <p>Carregando convênios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Convênios</h2>
      <ul>
        {convenios.map(convenio => (
          <li key={convenio.id}>
            {convenio.nome} - {convenio.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}
