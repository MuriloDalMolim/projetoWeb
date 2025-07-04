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

          if (!res.data || Object.keys(res.data).length === 0) {
            setError('Convênio não encontrado.');
          } else {
            setConvenio(res.data);
          }
        } catch (err) {
          console.error('Erro ao carregar convênio:', err);
          setError('Erro ao carregar convênio.');
        } finally {
          setLoading(false);
        }
      };

      fetchConvenio();
    }
  }, [id]);

  const handleChange = e => setConvenio({ ...convenio, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/convenios/${id}`, convenio);
      } else {
        await api.post('/convenios', convenio);
      }
      navigate('/convenios');
    } catch {
      alert('Erro ao salvar convênio');
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Convênio' : 'Novo Convênio'}</h2>
      {loading && <p>Carregando convênio...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={convenio.nome}
          onChange={handleChange}
          required={!id} // Apenas obrigatório no cadastro
        />
        <input
          name="descricao"
          placeholder="Descrição"
          value={convenio.descricao}
          onChange={handleChange}
          required={!id} // Apenas obrigatório no cadastro
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
