import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function PacienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState({
    nome: '',
    senha: '',
    cpf: '',
    telefone: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchPaciente = async () => {
        try {
          setLoading(true);
          setError('');

          const response = await api.get(`/pacientes/${id}`);

          if (!response.data || Object.keys(response.data).length === 0) {
            setError('Paciente não encontrado.');
          } else {
            setPaciente(response.data);
          }
        } catch (err) {
          console.error('Erro ao carregar paciente:', err);
          if (err.response && err.response.status === 404) {
            setError('Paciente não encontrado.');
          } else {
            setError('Falha ao conectar com o servidor.');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchPaciente();
    }
  }, [id]);

  const handleChange = e => setPaciente({ ...paciente, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/pacientes/${id}`, paciente);
      } else {
        await api.post('/pacientes', paciente);
      }
      navigate('/pacientes');
    } catch (err) {
      console.error('Erro ao salvar paciente', err);
      alert('Erro ao salvar paciente');
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Paciente' : 'Novo Paciente'}</h2>
      {loading && <p>Carregando paciente...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={paciente.nome}
          onChange={handleChange}
          required={!id}
        />
        <input
          name="senha"
          placeholder="Senha"
          value={paciente.senha}
          onChange={handleChange}
          type="password"
          required={!id}
        />
        <input
          name="cpf"
          placeholder="CPF"
          value={paciente.cpf}
          onChange={handleChange}
          required={!id}
        />
        <input
          name="telefone"
          placeholder="Telefone"
          value={paciente.telefone}
          onChange={handleChange}
          required={!id}
        />
        <button type="submit">Salvar</button>
      </form>
      <button onClick={() => navigate('/pacientes')}>Voltar</button>
    </div>
  );
}
