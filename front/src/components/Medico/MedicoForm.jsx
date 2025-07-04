import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function MedicoForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medico, setMedico] = useState({
    nome: '',
    senha: '',
    crm: '',
    especialidade: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

useEffect(() => {
    if (id) {
      const fetchMedico = async () => {
        try {
          setLoading(true);
          setError('');

          const response = await api.get(`/medicos/${id}`);

          // Verifica se veio o médico
          if (!response.data || Object.keys(response.data).length === 0) {
            setError('Médico não encontrado.');
          } else {
            setMedico(response.data);
          }
        } catch (err) {
          console.error('Erro ao carregar médico:', err);

          if (err.response && err.response.status === 404) {
            setError('Médico não encontrado.');
          } else if (err.response && err.response.status === 403) {
            setError('Acesso negado.');
          } else {
            setError('Falha ao conectar com o servidor.');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchMedico();
    }
  }, [id]);

  const handleChange = e => {
    setMedico({ ...medico, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/medicos/${id}`, medico);
      } else {
        await api.post('/medicos', medico);
      }
      navigate('/medicos');
    } catch (err) {
      console.error('Erro ao salvar médico', err);
      alert('Erro ao salvar médico');
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Médico' : 'Novo Médico'}</h2>
      {loading && <p>Carregando médico...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={medico.nome}
          onChange={handleChange}
          required={!id} // Apenas obrigatório se for criar
        />
        <input
          name="senha"
          placeholder="Senha"
          value={medico.senha}
          onChange={handleChange}
          type="password"
          required={!id} // Apenas obrigatório se for criar
        />
        <input
          name="crm"
          placeholder="CRM"
          value={medico.crm}
          onChange={handleChange}
          required={!id} // Apenas obrigatório se for criar
        />
        <input
          name="especialidade"
          placeholder="Especialidade"
          value={medico.especialidade}
          onChange={handleChange}
          required={!id} // Apenas obrigatório se for criar
        />
        <input
          name="email"
          placeholder="Email"
          value={medico.email}
          onChange={handleChange}
          type="email"
          required={!id} // Apenas obrigatório se for criar
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}