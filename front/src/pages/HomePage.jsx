import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold mb-6">Sistema de Gestão Clínica</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/medicos')}>Médicos</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/pacientes')}>Pacientes</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/convenios')}>Convênios</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/consultas')}>Consultas</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/pacienteconvenios')}>Paciente x Convênio</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/prontuarios')}>Prontuários</button>
    </div>
  );
}
