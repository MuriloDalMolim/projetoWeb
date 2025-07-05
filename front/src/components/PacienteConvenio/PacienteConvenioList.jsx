import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function PacienteConvenioList() {
  const [associacoes, setAssociacoes] = useState([]);
  const navigate = useNavigate();

  const fetchAssociacoes = async () => {
    try {
      const res = await api.get('/pacienteconvenios');
      setAssociacoes(res.data);
    } catch (error) {
      console.error('Erro ao buscar associações:', error);
    }
  };

  useEffect(() => {
    fetchAssociacoes();
  }, []);

  const handleDelete = async (idPaciente, idConvenio) => {
    if (window.confirm('Deseja realmente excluir esta associação?')) {
      try {
        await api.delete(`/pacienteconvenios/${idPaciente}/${idConvenio}`);
        fetchAssociacoes();
      } catch (error) {
        console.error('Erro ao excluir associação:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Associações Paciente-Convênio</h2>
      <button
        onClick={() => navigate('/pacienteconvenios/novo')}
        style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', marginBottom: '1.5rem' }}
      >
        Nova Associação
      </button>
      {associacoes.length === 0 ? (
        <p style={{ color: '#4b5563' }}>Nenhuma associação encontrada.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>ID Paciente</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>ID Convênio</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>Número do Plano</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {associacoes.map((a) => (
                <tr key={`${a.idPaciente}-${a.idConvenio}`} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{a.idPaciente}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{a.idConvenio}</td>
                  <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>{a.numeroPlano}</td>
                  <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => navigate(`/pacienteconvenios/${a.idPaciente}/${a.idConvenio}`)} 
                      style={{ backgroundColor: '#f59e0b', color: 'white', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginRight: '0.5rem' }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(a.idPaciente, a.idConvenio)}
                      style={{ backgroundColor: '#dc2626', color: 'white', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={() => navigate('/home')}
        style={{ marginTop: '1.5rem', backgroundColor: '#6b7280', color: 'white', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}
      >
        Voltar
      </button>
    </div>
  );
}