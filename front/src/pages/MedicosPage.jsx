import React from 'react';
import MedicoList from '../components/Medico/MedicoList';

export default function MedicosPage() {
  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      {/* MedicoList agora é renderizado diretamente, a navegação de edição/adição será dentro dele */}
      <MedicoList />
    </div>
  );
}