import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConvenioForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [convenio, setConvenio] = useState({
    nome: '',
    descricao: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchConvenio = async () => {
        try {
          setLoading(true);
          setError('');
          const res = await api.get(`/convenios/${id}`);
          if (res.data) {
            setConvenio(res.data);
          } else {
            setError('Convênio não encontrado.');
          }
        } catch (err) {
          console.error('Erro ao carregar convênio:', err);
          setError('Erro ao carregar convênio. Verifique o ID.');
        } finally {
          setLoading(false);
        }
      };
      fetchConvenio();
    } else {
      setConvenio({ nome: '', descricao: '' });
    }
  }, [id]);

  const handleChange = e => {
    setConvenio({ ...convenio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/convenios/${id}`, convenio);
      } else {
        await api.post('/convenios', convenio);
      }
      navigate('/convenios');
    } catch (err) {
      console.error('Erro ao salvar convênio', err);
      alert('Erro ao salvar convênio');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', color: '#2563eb', fontSize: '1.125rem', marginTop: '2rem' }}>Carregando convênio...</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '1.125rem', marginTop: '2rem' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>{id ? 'Editar Convênio' : 'Novo Convênio'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="nome" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Nome:</label>
          <input
            id="nome"
            name="nome"
            placeholder="Nome do convênio"
            value={convenio.nome}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="descricao" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Descrição:</label>
          <input
            id="descricao"
            name="descricao"
            placeholder="Descrição do convênio"
            value={convenio.descricao}
            onChange={handleChange}
            required
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
            onClick={() => navigate('/convenios')}
            style={{ backgroundColor: '#6b7280', color: 'white', padding: '0.625rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}