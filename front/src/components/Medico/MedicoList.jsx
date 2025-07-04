import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';

export default function MedicoList() {
  const [medicos, setMedicos] = useState([]);

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
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Lista de Médicos</h2>
      <Link to="/medicos/novo">
        <button style={{ marginBottom: 15 }}>Adicionar Médico</button>
      </Link>
      {medicos.length === 0 ? (
        <p>Nenhum médico encontrado.</p>
      ) : (
        <ul>
          {medicos.map(medico => (
            <li key={medico.id} style={{ marginBottom: 10 }}>
              <strong>Nome:</strong> {medico.nome} <br />
              <strong>CRM:</strong> {medico.crm} <br />
              <strong>Especialidade:</strong> {medico.especialidade} <br />
              <strong>Email:</strong> {medico.email} <br />
              <Link to={`/medicos/${medico.id}`}>
                <button style={{ marginRight: 10 }}>Editar</button>
              </Link>
              <button onClick={() => handleDelete(medico.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
