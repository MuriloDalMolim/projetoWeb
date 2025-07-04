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
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>{id ? 'Editar Consulta' : 'Nova Consulta'}</h2>
      {loading && <p style={{ color: '#2563eb', marginBottom: '1rem' }}>Carregando consulta...</p>}
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="idPaciente" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>ID Paciente:</label>
          <input
            id="idPaciente"
            name="idPaciente"
            placeholder="ID do Paciente"
            value={consulta.idPaciente}
            onChange={handleChange}
            required={!id}
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="idMedico" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>ID Médico:</label>
          <input
            id="idMedico"
            name="idMedico"
            placeholder="ID do Médico"
            value={consulta.idMedico}
            onChange={handleChange}
            required={!id}
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="local" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Local:</label>
          <input
            id="local"
            name="local"
            placeholder="Local da consulta"
            value={consulta.local}
            onChange={handleChange}
            required={!id}
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="status" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Status:</label>
          <input
            id="status"
            name="status"
            placeholder="Status da consulta"
            value={consulta.status}
            onChange={handleChange}
            required={!id}
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="data" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Data (YYYY-MM-DD):</label>
          <input
            id="data"
            name="data"
            placeholder="AAAA-MM-DD"
            value={consulta.data}
            onChange={handleChange}
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
            onClick={() => navigate('/consultas')}
            style={{ backgroundColor: '#6b7280', color: 'white', padding: '0.625rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}