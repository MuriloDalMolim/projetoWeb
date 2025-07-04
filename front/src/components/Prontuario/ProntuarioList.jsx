import React, { useState } from 'react';

export default function ProntuarioList({ prontuarios, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    sintomas: '',
    diagnostico: '',
    prescricao: '',
    observacoes: '',
  });

  const startEdit = (item) => {
    setEditId(item.id_consulta);
    setFormData({
      sintomas: item.sintomas || '',
      diagnostico: item.diagnostico || '',
      prescricao: item.prescricao || '',
      observacoes: item.observacoes || '',
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setFormData({
      sintomas: '',
      diagnostico: '',
      prescricao: '',
      observacoes: '',
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveEdit = () => {
    onUpdate(editId, formData);
    cancelEdit();
  };

  if (!prontuarios || prontuarios.length === 0) {
    return <p>Nenhum prontuário encontrado.</p>;
  }

  return (
    <table border="1" cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          <th>ID Consulta</th>
          <th>Data</th>
          <th>Sintomas</th>
          <th>Diagnóstico</th>
          <th>Prescrição</th>
          <th>Observações</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {prontuarios.map((item) => (
          <tr key={item.id_consulta}>
            <td>{item.id_consulta}</td>
            <td>{new Date(item.data).toLocaleDateString()}</td>

            {editId === item.id_consulta ? (
              <>
                <td>
                  <input
                    type="text"
                    name="sintomas"
                    value={formData.sintomas}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="diagnostico"
                    value={formData.diagnostico}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="prescricao"
                    value={formData.prescricao}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <button onClick={saveEdit}>Salvar</button>{' '}
                  <button onClick={cancelEdit}>Cancelar</button>
                </td>
              </>
            ) : (
              <>
                <td>{item.sintomas || '-'}</td>
                <td>{item.diagnostico || '-'}</td>
                <td>{item.prescricao || '-'}</td>
                <td>{item.observacoes || '-'}</td>
                <td>
                  <button onClick={() => startEdit(item)}>Editar</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
