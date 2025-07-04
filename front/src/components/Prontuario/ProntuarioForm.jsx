import React, { useState, useEffect } from 'react';

export default function ProntuarioForm({ prontuario = {}, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    pacienteId: '',
    descricao: '',
    data: '',
    ...prontuario
  });

  useEffect(() => {
    setFormData({ pacienteId: '', descricao: '', data: '', ...prontuario });
  }, [prontuario]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.pacienteId || !formData.descricao || !formData.data) {
      alert('Preencha todos os campos.');
      return;
    }
    onSave(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Paciente ID:</label>
        <input
          type="text"
          name="pacienteId"
          value={formData.pacienteId}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Data:</label>
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}
