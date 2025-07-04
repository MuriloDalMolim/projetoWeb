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

  if (loading) return <p>Carregando pacientes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <ul>
        {pacientes.map(paciente => (
          <li key={paciente.id}>
            {paciente.nome} - CPF: {paciente.cpf} - Telefone: {paciente.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
}
