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
    return <p style={{ color: '#4b5563', textAlign: 'center', marginTop: '1rem' }}>Nenhum prontuário encontrado para este paciente.</p>;
  }

  return (
    <div style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Histórico de Prontuário</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>ID Consulta</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>Data</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>Sintomas</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>Diagnóstico</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>Prescrição</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>Observações</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {prontuarios.map((item) => (
              <tr key={item.id_consulta} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{item.id_consulta}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{new Date(item.data).toLocaleDateString()}</td>

                {editId === item.id_consulta ? (
                  <>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <label htmlFor={`sintomas-${item.id_consulta}`} style={{ display: 'none' }}>Sintomas:</label>
                      <input
                        id={`sintomas-${item.id_consulta}`}
                        type="text"
                        name="sintomas"
                        value={formData.sintomas}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', outline: 'none' }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <label htmlFor={`diagnostico-${item.id_consulta}`} style={{ display: 'none' }}>Diagnóstico:</label>
                      <input
                        id={`diagnostico-${item.id_consulta}`}
                        type="text"
                        name="diagnostico"
                        value={formData.diagnostico}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', outline: 'none' }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <label htmlFor={`prescricao-${item.id_consulta}`} style={{ display: 'none' }}>Prescrição:</label>
                      <input
                        id={`prescricao-${item.id_consulta}`}
                        type="text"
                        name="prescricao"
                        value={formData.prescricao}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', outline: 'none' }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <label htmlFor={`observacoes-${item.id_consulta}`} style={{ display: 'none' }}>Observações:</label>
                      <input
                        id={`observacoes-${item.id_consulta}`}
                        type="text"
                        name="observacoes"
                        value={formData.observacoes}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', outline: 'none' }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                      <button
                        onClick={saveEdit}
                        style={{ backgroundColor: '#16a34a', color: 'white', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginRight: '0.5rem' }}
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelEdit}
                        style={{ backgroundColor: '#6b7280', color: 'white', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                      >
                        Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{item.sintomas || '-'}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{item.diagnostico || '-'}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{item.prescricao || '-'}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{item.observacoes || '-'}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <button
                        onClick={() => startEdit(item)}
                        style={{ backgroundColor: '#f59e0b', color: 'white', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                      >
                        Editar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}