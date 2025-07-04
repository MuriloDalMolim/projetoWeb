import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

export default function PacienteConvenioForm() {
  const [idPaciente, setIdPaciente] = useState('');
  const [idConvenio, setIdConvenio] = useState('');
  const [numeroPlano, setNumeroPlano] = useState('');
  const navigate = useNavigate();
  const { idPaciente: paramPaciente, idConvenio: paramConvenio } = useParams();

  useEffect(() => {
    if (paramPaciente && paramConvenio) {
      api.get(`/pacienteconvenios/${paramPaciente}/${paramConvenio}`)
        .then((res) => {
          setIdPaciente(res.data.idPaciente);
          setIdConvenio(res.data.idConvenio);
          setNumeroPlano(res.data.numeroPlano);
        })
        .catch((err) => console.error('Erro ao buscar associação:', err));
    }
  }, [paramPaciente, paramConvenio]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (paramPaciente && paramConvenio) {
        // Atualização
        await api.put(`/pacienteconvenios/${paramPaciente}/${paramConvenio}`, { numeroPlano });
      } else {
        // Criação
        await api.post('/pacienteconvenios', { idPaciente, idConvenio, numeroPlano });
      }

      navigate('/pacienteconvenios');
    } catch (error) {
      console.error('Erro ao salvar associação:', error);
      alert('Erro ao salvar associação.');
    }
  };

  return (
    <div>
      <h2>{paramPaciente && paramConvenio ? 'Editar' : 'Nova'} Associação</h2>
      <form onSubmit={handleSubmit}>
        {!paramPaciente && (
          <div>
            <label>ID Paciente:</label>
            <input type="text" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} required />
          </div>
        )}

        {!paramConvenio && (
          <div>
            <label>ID Convênio:</label>
            <input type="text" value={idConvenio} onChange={(e) => setIdConvenio(e.target.value)} required />
          </div>
        )}

        <div>
          <label>Número do Plano:</label>
          <input type="text" value={numeroPlano} onChange={(e) => setNumeroPlano(e.target.value)} required />
        </div>

        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate('/pacienteconvenios')}>Cancelar</button>
      </form>
    </div>
  );
}
