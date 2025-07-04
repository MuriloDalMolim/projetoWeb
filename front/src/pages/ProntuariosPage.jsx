import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProntuarioList from './../components/Prontuario/ProntuarioList';

export default function ProntuariosPage() {
  const [idPaciente, setIdPaciente] = useState('');
  const [prontuario, setProntuario] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token'); // pega o token do localStorage, ajuste se sua forma for diferente

  const buscarProntuario = async () => {
    setError('');
    if (!idPaciente) {
      setError('Informe o ID do paciente.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/api/prontuarios/${idPaciente}`, {
        headers: {
          authorization: token, // sem Bearer, só o token mesmo
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

      // Atualiza o estado local para refletir a alteração
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
    <div>
      <h2>Buscar Prontuário por ID do Paciente</h2>
      <input
        type="text"
        placeholder="ID do paciente"
        value={idPaciente}
        onChange={(e) => setIdPaciente(e.target.value)}
      />
      <button onClick={buscarProntuario}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {prontuario && prontuario.historico && prontuario.historico.length > 0 ? (
        <ProntuarioList prontuarios={prontuario.historico} onUpdate={atualizarEntrada} />
      ) : (
        prontuario && <p>Prontuário vazio.</p>
      )}
    </div>
  );
}
