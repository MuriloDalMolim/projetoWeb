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
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>{id ? 'Editar Médico' : 'Novo Médico'}</h2>
      {loading && <p style={{ color: '#2563eb', marginBottom: '1rem' }}>Carregando médico...</p>}
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="nome" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Nome:</label>
          <input
            id="nome"
            name="nome"
            placeholder="Nome completo"
            value={medico.nome}
            onChange={handleChange}
            required={!id}
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="senha" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Senha:</label>
          <input
            id="senha"
            name="senha"
            placeholder="Senha (deixe em branco para não alterar)"
            value={medico.senha}
            onChange={handleChange}
            type="password"
            required={!id}
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="crm" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>CRM:</label>
          <input
            id="crm"
            name="crm"
            placeholder="CRM"
            value={medico.crm}
            onChange={handleChange}
            required={!id}
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="especialidade" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Especialidade:</label>
          <input
            id="especialidade"
            name="especialidade"
            placeholder="Especialidade"
            value={medico.especialidade}
            onChange={handleChange}
            required={!id}
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Email:</label>
          <input
            id="email"
            name="email"
            placeholder="email@exemplo.com"
            value={medico.email}
            onChange={handleChange}
            type="email"
            required={!id}
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.625rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', marginRight: '0.5rem' }}
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => navigate('/medicos')} 
            style={{ backgroundColor: '#6b7280', color: 'white', padding: '0.625rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}