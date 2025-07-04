import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

export default function PacienteConvenioForm() {
  // Estado inicial dos campos
  const [idPaciente, setIdPaciente] = useState('');
  const [idConvenio, setIdConvenio] = useState('');
  const [numeroPlano, setNumeroPlano] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // Destruturando os parâmetros da URL
  const { idPaciente: paramPaciente, idConvenio: paramConvenio } = useParams();

  // Debugging: Veja o que useParams está retornando
  console.log('useParams:', { paramPaciente, paramConvenio });

  useEffect(() => {
    // Resetar erro e loading a cada vez que os parâmetros mudam
    setError(null);

    if (paramPaciente && paramConvenio) { // Se ambos os parâmetros existem, estamos em modo de edição
      setLoading(true); // Ativa o estado de carregamento
      console.log(`Buscando associação para Paciente ${paramPaciente} e Convênio ${paramConvenio}`); // Debug
      const fetchAssociacao = async () => {
        try {
          const res = await api.get(`/pacienteconvenios/${paramPaciente}/${paramConvenio}`);
          console.log('Dados da associação recebidos:', res.data); // Debug
          if (res.data) {
            // Preenche os estados com os dados da API
            setIdPaciente(res.data.idPaciente);
            setIdConvenio(res.data.idConvenio);
            setNumeroPlano(res.data.numeroPlano || ''); // Garante que seja string vazia se undefined/null
          } else {
            setError('Associação não encontrada ou dados vazios.');
            // Se não encontrou dados, reseta os campos para vazio
            setIdPaciente('');
            setIdConvenio('');
            setNumeroPlano('');
          }
        } catch (err) {
          console.error('Erro ao buscar associação na API:', err); // Debug mais detalhado
          if (err.response && err.response.status === 404) {
             setError('Associação não encontrada.');
          } else {
             setError('Erro ao carregar associação. Verifique os IDs ou a conexão com o servidor.');
          }
          // Em caso de erro, reseta os campos para vazio para evitar tela branca com dados antigos
          setIdPaciente('');
          setIdConvenio('');
          setNumeroPlano('');
        } finally {
          setLoading(false); // Desativa o estado de carregamento
        }
      };
      fetchAssociacao();
    } else {
      // Se não há parâmetros de edição, é um novo cadastro. Reseta todos os campos.
      console.log('Modo de criação: Resetando campos.'); // Debug
      setIdPaciente('');
      setIdConvenio('');
      setNumeroPlano('');
      setLoading(false); // Garante que não fique em loading no modo de criação
    }
  }, [paramPaciente, paramConvenio]); // Dependências do useEffect

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar se os IDs estão preenchidos para nova associação
    if (!(paramPaciente && paramConvenio) && (!idPaciente || !idConvenio || !numeroPlano)) {
        alert('Preencha todos os campos obrigatórios.');
        return;
    }
    // Validar para edição (apenas numeroPlano é o campo editável aqui)
    if ((paramPaciente && paramConvenio) && !numeroPlano) {
        alert('O número do plano é obrigatório para edição.');
        return;
    }

    try {
      if (paramPaciente && paramConvenio) { // Se editando
        await api.put(`/pacienteconvenios/${paramPaciente}/${paramConvenio}`, { numeroPlano });
      } else { // Se criando
        await api.post('/pacienteconvenios', { idPaciente, idConvenio, numeroPlano });
      }

      navigate('/pacienteconvenios'); // Redireciona após salvar
    } catch (error) {
      console.error('Erro ao salvar associação:', error);
      alert('Erro ao salvar associação. Verifique os dados ou se a associação já existe.');
    }
  };

  // Renderização condicional com estilos inline
  if (loading) return <p style={{ textAlign: 'center', color: '#2563eb', fontSize: '1.125rem', marginTop: '2rem' }}>Carregando associação...</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '1.125rem', marginTop: '2rem' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>{paramPaciente && paramConvenio ? 'Editar' : 'Nova'} Associação</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Campos de ID Paciente e ID Convênio são editáveis apenas na criação */}
        {!(paramPaciente && paramConvenio) ? ( // Modo de criação
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
        ) : ( // Modo de edição: exibir IDs apenas como texto
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