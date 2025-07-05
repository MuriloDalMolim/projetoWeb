import React, { useState} from 'react';
import axios from 'axios';
import ProntuarioList from './../components/Prontuario/ProntuarioList'; 

export default function ProntuariosPage() {
  const [idPaciente, setIdPaciente] = useState('');
  const [prontuario, setProntuario] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const buscarProntuario = async () => {
    setError('');
    if (!idPaciente) {
      setError('Informe o ID do paciente.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/api/prontuarios/${idPaciente}`, {
        headers: {
          authorization: token,
        },
      });
      setProntuario(response.data);
    } catch (err) {
      setProntuario(null);
      if (err.response) setError(err.response.data.message);
      else setError('Erro ao buscar prontuário.');
    }
  };

  const atualizarEntrada = async (idConsulta, dadosAtualizados) => {
    try {
      await axios.put(
        `http://localhost:3000/api/prontuarios/${idPaciente}/${idConsulta}`,
        dadosAtualizados,
        {
          headers: { authorization: token },
        }
      );

      setProntuario((prev) => {
        if (!prev) return prev;
        const novoHistorico = prev.historico.map((item) =>
          item.id_consulta === idConsulta ? { ...item, ...dadosAtualizados } : item
        );
        return { ...prev, historico: novoHistorico };
      });
    } catch (err) {
      alert('Erro ao atualizar entrada: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937', textAlign: 'center' }}>Buscar Prontuário por ID do Paciente</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="ID do paciente"
            value={idPaciente}
            onChange={(e) => setIdPaciente(e.target.value)}
            style={{ flexGrow: 1, padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none', width: '100%', maxWidth: '20rem' }}
          />
          <button
            onClick={buscarProntuario}
            style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}
          >
            Buscar
          </button>
        </div>

        {error && <p style={{ textAlign: 'center', color: 'red', fontSize: '1.125rem', marginBottom: '1rem' }}>{error}</p>}
      </div>

      {prontuario && prontuario.historico ? (
        prontuario.historico.length > 0 ? (
          <ProntuarioList prontuarios={prontuario.historico} onUpdate={atualizarEntrada} />
        ) : (
          <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '1.125rem' }}>Prontuário vazio.</p>
        )
      ) : null}
    </div>
  );
}