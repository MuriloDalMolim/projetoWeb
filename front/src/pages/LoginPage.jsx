import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { login, senha });
      console.log('Resposta do login:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        navigate('/home'); // Ajuste a rota para onde o usuário deve ir após login
      } else {
        alert('Token não recebido do servidor.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Login inválido. Verifique suas credenciais.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="CRM (médico) ou CPF (paciente)"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
