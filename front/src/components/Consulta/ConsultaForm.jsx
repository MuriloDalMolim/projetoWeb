import React, { useEffect, useState, useMemo } from 'react'; // Importar useMemo
import api from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function ConsultaForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mapeamento de status para caracteres únicos
  const statusMap = useMemo(() => ({ // Use useMemo para memorizar o objeto statusMap
    'Agendada': 'A',
    'Confirmada': 'C',
    'Realizada': 'R',
    'Cancelada': 'X'
  }), []); // Array de dependências vazio, pois o objeto é constante

  // Mapeamento inverso para exibir no formulário ao editar
  const reverseStatusMap = useMemo(() => ({ // Use useMemo para memorizar o objeto reverseStatusMap
    'A': 'Agendada',
    'C': 'Confirmada',
    'R': 'Realizada',
    'X': 'Cancelada'
  }), []); // Array de dependências vazio, pois o objeto é constante

  const [consulta, setConsulta] = useState({
    idPaciente: '',
    idMedico: '',
    local: '',
    data: '',
    status: 'Agendada' // Valor completo para inicializar o select
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchConsulta = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await api.get(`/consultas/${id}`);
          if (response.data) {
            const formattedDate = response.data.data ? new Date(response.data.data).toISOString().split('T')[0] : '';
            setConsulta({
              ...response.data,
              data: formattedDate,
              // Mapeia o caractere único vindo da API (response.data.status)
              // de volta para o texto completo para que o <select> possa exibi-lo corretamente.
              status: response.data.status ? reverseStatusMap[response.data.status] : 'Agendada'
            });
          } else {
            setError('Consulta não encontrada.');
          }
        } catch (err) {
          console.error('Erro ao carregar consulta:', err);
          setError('Erro ao carregar consulta. Verifique o ID.');
        } finally {
          setLoading(false);
        }
      };
      fetchConsulta();
    } else {
      setConsulta({
        idPaciente: '',
        idMedico: '',
        local: '',
        data: '',
        status: 'Agendada'
      });
    }
  }, [id, reverseStatusMap]); // reverseStatusMap agora é uma dependência estável devido ao useMemo

  const handleChange = e => {
    setConsulta({ ...consulta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cria um objeto de consulta para enviar, com o status mapeado para caractere único
      const consultaToSend = {
        ...consulta,
        status: statusMap[consulta.status] // Aqui 'Agendada' vira 'A', etc.
      };

      if (id) {
        await api.put(`/consultas/${id}`, consultaToSend);
      } else {
        await api.post('/consultas', consultaToSend);
      }
      navigate('/consultas');
    } catch (err) {
      console.error('Erro ao salvar consulta', err);
      alert('Erro ao salvar consulta: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <p style={{ textAlign: 'center', color: '#2563eb', fontSize: '1.125rem', marginTop: '2rem' }}>Carregando consulta...</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '1.125rem', marginTop: '2rem' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>{id ? 'Editar Consulta' : 'Agendar Nova Consulta'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="idPaciente" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>ID Paciente:</label>
          <input
            id="idPaciente"
            name="idPaciente"
            placeholder="ID do Paciente"
            value={consulta.idPaciente}
            onChange={handleChange}
            required
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
            required
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
            required
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="data" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Data da Consulta:</label>
          <input
            id="data"
            name="data"
            type="date"
            value={consulta.data}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="status" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Status:</label>
          <select
            id="status"
            name="status"
            value={consulta.status} // O estado mantém o texto completo
            onChange={handleChange} // onChange direto para atualizar o estado com o texto completo
            required
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          >
            <option value="Agendada">Agendada</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Realizada">Realizada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
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