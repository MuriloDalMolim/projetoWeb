import React, { useState } from 'react';
import MedicoList from '../components/Medico/MedicoList';
import MedicoForm from '../components/Medico/MedicoForm';

export default function MedicosPage() {
  const [editarId, setEditarId] = useState(null); // id do médico para editar
  const [abrirForm, setAbrirForm] = useState(false);

  const abrirFormularioNovo = () => {
    setEditarId(null);
    setAbrirForm(true);
  };

  const abrirFormularioEditar = (id) => {
    setEditarId(id);
    setAbrirForm(true);
  };

  const fecharFormulario = () => {
    setAbrirForm(false);
    setEditarId(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      {!abrirForm && (
        <MedicoList onAdd={abrirFormularioNovo} onEdit={abrirFormularioEditar} />
      )}

      {abrirForm && (
        <div>
          <button onClick={fecharFormulario} style={{ marginBottom: 10 }}>
            Voltar
          </button>
          <MedicoForm id={editarId} onSuccess={fecharFormulario} />
        </div>
      )}
    </div>
  );
}
