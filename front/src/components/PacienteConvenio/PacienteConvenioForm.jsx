import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

export default function PacienteConvenioForm() {
  const [idPaciente, setIdPaciente] = useState('');
  const [idConvenio, setIdConvenio] = useState('');
  const [numeroPlano, setNumeroPlano] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { idPaciente: paramPaciente, idConvenio: paramConvenio } = useParams();

  console.log('useParams:', { paramPaciente, paramConvenio });

  useEffect(() => {
    setError(null);

    if (paramPaciente && paramConvenio) { 
      setLoading(true); 
      console.log(`Buscando associação para Paciente ${paramPaciente} e Convênio ${paramConvenio}`); 
      const fetchAssociacao = async () => {
        try {
          const res = await api.get(`/pacienteconvenios/${paramPaciente}/${paramConvenio}`);
          console.log('Dados da associação recebidos:', res.data); 
          if (res.data) {
            setIdPaciente(res.data.idPaciente);
            setIdConvenio(res.data.idConvenio);
            setNumeroPlano(res.data.numeroPlano || '');
          } else {
            setError('Associação não encontrada ou dados vazios.');
            setIdPaciente('');
            setIdConvenio('');
            setNumeroPlano('');
          }
        } catch (err) {
          console.error('Erro ao buscar associação na API:', err); 
          if (err.response && err.response.status === 404) {
             setError('Associação não encontrada.');
          } else {
             setError('Erro ao carregar associação. Verifique os IDs ou a conexão com o servidor.');
          }
          setIdPaciente('');
          setIdConvenio('');
          setNumeroPlano('');
        } finally {
          setLoading(false); 
        }
      };
      fetchAssociacao();
    } else {
      console.log('Modo de criação: Resetando campos.'); 
      setIdPaciente('');
      setIdConvenio('');
      setNumeroPlano('');
      setLoading(false); 
    }
  }, [paramPaciente, paramConvenio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(paramPaciente && paramConvenio) && (!idPaciente || !idConvenio || !numeroPlano)) {
        alert('Preencha todos os campos obrigatórios.');
        return;
    }
    if ((paramPaciente && paramConvenio) && !numeroPlano) {
        alert('O número do plano é obrigatório para edição.');
        return;
    }

    try {
      if (paramPaciente && paramConvenio) {
        await api.put(`/pacienteconvenios/${paramPaciente}/${paramConvenio}`, { numeroPlano });
      } else { // Se criando
        await api.post('/pacienteconvenios', { idPaciente, idConvenio, numeroPlano });
      }

      navigate('/pacienteconvenios'); 
    } catch (error) {
      console.error('Erro ao salvar associação:', error);
      alert('Erro ao salvar associação. Verifique os dados ou se a associação já existe.');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', color: '#2563eb', fontSize: '1.125rem', marginTop: '2rem' }}>Carregando associação...</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '1.125rem', marginTop: '2rem' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>{paramPaciente && paramConvenio ? 'Editar' : 'Nova'} Associação</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {!(paramPaciente && paramConvenio) ? (
          <>
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
          </>
        ) : ( 
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