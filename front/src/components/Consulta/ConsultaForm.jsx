import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConsultaForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [consulta, setConsulta] = useState({
    idPaciente: '',
    idMedico: '',
    local: '',
    status: '',
    data: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchConsulta = async () => {
        try {
          setLoading(true);
          setError('');
          const res = await api.get(`/consultas/${id}`);

          if (!res.data || Object.keys(res.data).length === 0) {
            setError('Consulta não encontrada.');
          } else {
            setConsulta(res.data);
          }
        } catch (err) {
          console.error('Erro ao carregar consulta:', err);
          setError('Erro ao carregar consulta.');
        } finally {
          setLoading(false);
        }
      };

      fetchConsulta();
    }
  }, [id]);

  const handleChange = e => setConsulta({ ...consulta, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/consultas/${id}`, consulta);
      } else {
        await api.post('/consultas', consulta);
      }
      navigate('/consultas');
    } catch {
      alert('Erro ao salvar consulta');
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Consulta' : 'Nova Consulta'}</h2>
      {loading && <p>Carregando consulta...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="idPaciente"
          placeholder="ID Paciente"
          value={consulta.idPaciente}
          onChange={handleChange}
          required={!id} // obrigatório no cadastro
        />
        <input
          name="idMedico"
          placeholder="ID Médico"
          value={consulta.idMedico}
          onChange={handleChange}
          required={!id}
        />
        <input
          name="local"
          placeholder="Local"
          value={consulta.local}
          onChange={handleChange}
          required={!id}
        />
        <input
          name="status"
          placeholder="Status"
          value={consulta.status}
          onChange={handleChange}
          required={!id}
        />
        <input
          name="data"
          placeholder="Data (YYYY-MM-DD)"
          value={consulta.data}
          onChange={handleChange}
          required={!id}
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
