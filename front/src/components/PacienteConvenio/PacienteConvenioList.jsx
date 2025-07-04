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
    <div>
      <h2>Associações Paciente-Convênio</h2>
      <button onClick={() => navigate('/pacienteconvenios/novo')}>Nova Associação</button>
      <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID Paciente</th>
            <th>ID Convênio</th>
            <th>Número do Plano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {associacoes.map((a) => (
            <tr key={`${a.idPaciente}-${a.idConvenio}`}>
              <td>{a.idPaciente}</td>
              <td>{a.idConvenio}</td>
              <td>{a.numeroPlano}</td>
              <td>
                <button onClick={() => navigate(`/pacienteconvenios/${a.idPaciente}/${a.idConvenio}`)}>Editar</button>
                <button onClick={() => handleDelete(a.idPaciente, a.idConvenio)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
