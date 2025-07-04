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
    } catch {
      alert('Erro ao buscar pacientes');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmar exclusão?')) {
      await api.delete(`/pacientes/${id}`);
      fetchPacientes();
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  return (
    <div>
      <h2>Pacientes</h2>
      <button onClick={() => navigate('/pacientes/novo')}>Novo Paciente</button>
      <ul>
        {pacientes.map(p => (
          <li key={p.id}>
            {p.nome} - CPF: {p.cpf} - Telefone: {p.telefone}
            {' '}
            <button onClick={() => navigate(`/pacientes/${p.id}`)}>Editar</button>
            {' '}
            <button onClick={() => handleDelete(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/home')}>Voltar</button>
    </div>
  );
}
