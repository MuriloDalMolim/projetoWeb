import React, { useEffect, useState } from 'react';
import api from '../../api/api';

export default function PacienteConveniosPage() {
  const [associacoes, setAssociacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssociacoes = async () => {
    try {
      const response = await api.get('/pacienteConvenios'); // rota corrigida
      console.log('Dados recebidos:', response.data); // log para debug
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

  if (loading) return <p>Carregando associações paciente-convênio...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Associações Paciente-Convênio</h2>
      {associacoes.length === 0 ? (
        <p>Nenhuma associação encontrada.</p>
      ) : (
        <ul>
          {associacoes.map(ass => (
            <li key={ass.id}>
              Paciente ID: {ass.idPaciente} - Convênio ID: {ass.idConvenio} - Nº Plano: {ass.numeroPlano}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
