import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

export default function PacienteConvenioForm() {
  const [idPaciente, setIdPaciente] = useState('');
  const [idConvenio, setIdConvenio] = useState('');
  const [numeroPlano, setNumeroPlano] = useState('');
  const [loading, setLoading] = useState(false); // Adicionado estado de carregamento
  const [error, setError] = useState(null);       // Adicionado estado de erro

  const navigate = useNavigate();
  const { idPaciente: paramPaciente, idConvenio: paramConvenio } = useParams(); // Desestruturação para clareza

  useEffect(() => {
    if (paramPaciente && paramConvenio) { // Se ambos os parâmetros existem, estamos em modo de edição
      const fetchAssociacao = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await api.get(`/pacienteconvenios/${paramPaciente}/${paramConvenio}`);
          if (res.data) {
            setIdPaciente(res.data.idPaciente);
            setIdConvenio(res.data.idConvenio);
            setNumeroPlano(res.data.numeroPlano);
          } else {
            setError('Associação não encontrada.');
          }
        } catch (err) {
          console.error('Erro ao buscar associação:', err);
          setError('Erro ao carregar associação. Verifique os IDs.');
        } finally {
          setLoading(false);
        }
      };
      fetchAssociacao();
    } else {
      // Se não há parâmetros, é um novo cadastro, limpar campos
      setIdPaciente('');
      setIdConvenio('');
      setNumeroPlano('');
    }
  }, [paramPaciente, paramConvenio]); // Dependências do useEffect

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (paramPaciente && paramConvenio) { // Se editando
        await api.put(`/pacienteconvenios/${paramPaciente}/${paramConvenio}`, { numeroPlano });
      } else { // Se criando
        await api.post('/pacienteconvenios', { idPaciente, idConvenio, numeroPlano });
      }

      navigate('/pacienteconvenios'); // Redireciona após salvar
    } catch (error) {
      console.error('Erro ao salvar associação:', error);
      alert('Erro ao salvar associação.');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', color: '#2563eb', fontSize: '1.125rem', marginTop: '2rem' }}>Carregando associação...</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '1.125rem', marginTop: '2rem' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>{paramPaciente && paramConvenio ? 'Editar' : 'Nova'} Associação</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Campos de ID Paciente e ID Convênio são editáveis apenas na criação */}
        {!(paramPaciente && paramConvenio) && ( // Mostra apenas se não estiver editando
          <div>
            <label htmlFor="idPaciente" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>ID Paciente:</label>
            <input
              id="idPaciente"
              type="text"
              value={idPaciente}
              onChange={(e) => setIdPaciente(e.target.value)}
              required
              style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
            />
          </div>
        )}

        {!(paramPaciente && paramConvenio) && ( // Mostra apenas se não estiver editando
          <div>
            <label htmlFor="idConvenio" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>ID Convênio:</label>
            <input
              id="idConvenio"
              type="text"
              value={idConvenio}
              onChange={(e) => setIdConvenio(e.target.value)}
              required
              style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
            />
          </div>
        )}

        {/* Exibir IDs em modo de edição (apenas leitura) */}
        {(paramPaciente && paramConvenio) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151' }}><span style={{ fontWeight: '500' }}>Paciente ID:</span> {paramPaciente}</p>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151' }}><span style={{ fontWeight: '500' }}>Convênio ID:</span> {paramConvenio}</p>
          </div>
        )}

        <div>
          <label htmlFor="numeroPlano" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Número do Plano:</label>
          <input
            id="numeroPlano"
            type="text"
            value={numeroPlano}
            onChange={(e) => setNumeroPlano(e.target.value)}
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
            onClick={() => navigate('/pacienteconvenios')}
            style={{ backgroundColor: '#6b7280', color: 'white', padding: '0.625rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}