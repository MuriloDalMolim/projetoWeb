import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

import MedicoList from './components/Medico/MedicoList';
import MedicoForm from './components/Medico/MedicoForm';

import PacienteList from './components/Paciente/PacienteList';
import PacienteForm from './components/Paciente/PacienteForm';

import ConvenioList from './components/Convenio/ConvenioList';
import ConvenioForm from './components/Convenio/ConvenioForm';

import ConsultaList from './components/Consulta/ConsultaList';
import ConsultaForm from './components/Consulta/ConsultaForm';

import PacienteConvenioList from './components/PacienteConvenio/PacienteConvenioList';
import PacienteConvenioForm from './components/PacienteConvenio/PacienteConvenioForm';

import ProntuariosPage from './pages/ProntuariosPage';

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Pública */}
        <Route path="/" element={<LoginPage />} />

        {/* Rotas Protegidas */}
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />

        {/* Médicos */}
        <Route path="/medicos" element={<PrivateRoute><MedicoList /></PrivateRoute>} />
        <Route path="/medicos/novo" element={<PrivateRoute><MedicoForm /></PrivateRoute>} />
        <Route path="/medicos/:id" element={<PrivateRoute><MedicoForm /></PrivateRoute>} />

        {/* Pacientes */}
        <Route path="/pacientes" element={<PrivateRoute><PacienteList /></PrivateRoute>} />
        <Route path="/pacientes/novo" element={<PrivateRoute><PacienteForm /></PrivateRoute>} />
        <Route path="/pacientes/:id" element={<PrivateRoute><PacienteForm /></PrivateRoute>} />

        {/* Convênios */}
        <Route path="/convenios" element={<PrivateRoute><ConvenioList /></PrivateRoute>} />
        <Route path="/convenios/novo" element={<PrivateRoute><ConvenioForm /></PrivateRoute>} />
        <Route path="/convenios/:id" element={<PrivateRoute><ConvenioForm /></PrivateRoute>} />

        {/* Consultas */}
        <Route path="/consultas" element={<PrivateRoute><ConsultaList /></PrivateRoute>} />
        <Route path="/consultas/novo" element={<PrivateRoute><ConsultaForm /></PrivateRoute>} />
        <Route path="/consultas/:id" element={<PrivateRoute><ConsultaForm /></PrivateRoute>} />

        {/* PacienteConvenio */}
        <Route path="/pacienteconvenios" element={<PrivateRoute><PacienteConvenioList /></PrivateRoute>} />
        <Route path="/pacienteconvenios/novo" element={<PrivateRoute><PacienteConvenioForm /></PrivateRoute>} />

        {/* Prontuários */}
        <Route path="/prontuarios" element={<ProntuariosPage />} />
      </Routes>
    </Router>
  );
}
