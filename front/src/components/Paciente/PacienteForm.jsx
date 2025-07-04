import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function PacienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState({
    nome: '',
    senha: '', // Mantido pois foi visto em Login (mas pode não ser armazenado diretamente aqui)
    cpf: '',
    telefone: '',
    // Removidos: dataNascimento, genero, endereco
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchPaciente = async () => {
        try {
          setLoading(true);
          setError('');
          const response = await api.get(`/pacientes/${id}`);
          if (response.data) {
            // Apenas define os campos que existem no backend
            setPaciente({
              nome: response.data.nome || '',
              senha: '', // Senha nunca deve ser pré-preenchida por segurança
              cpf: response.data.cpf || '',
              telefone: response.data.telefone || '',
            });
          } else {
            setError('Paciente não encontrado.');
          }
        } catch (err) {
          console.error('Erro ao carregar paciente:', err);
          setError('Erro ao carregar paciente. Verifique o ID.');
        } finally {
          setLoading(false);
        }
      };
      fetchPaciente();
    } else {
      // Reseta para formulário de criação
      setPaciente({
        nome: '',
        senha: '',
        cpf: '',
        telefone: '',
      });
    }
  }, [id]);

  const handleChange = e => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cria um objeto com os dados que realmente serão enviados à API
      const pacienteParaEnviar = {
        nome: paciente.nome,
        cpf: paciente.cpf,
        telefone: paciente.telefone,
      };

      // Adiciona a senha apenas se não for edição ou se ela foi preenchida na edição
      if (paciente.senha) {
          pacienteParaEnviar.senha = paciente.senha;
      } else if (!id) { // Se é um novo cadastro e a senha está vazia, força a requisição
          alert('A senha é obrigatória para novos cadastros.'); // Ou trate de outra forma
          return;
      }


      if (id) {
        await api.put(`/pacientes/${id}`, pacienteParaEnviar);
      } else {
        await api.post('/pacientes', pacienteParaEnviar);
      }
      navigate('/pacientes');
    } catch (err) {
      console.error('Erro ao salvar paciente', err);
      alert('Erro ao salvar paciente');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', color: '#2563eb', fontSize: '1.125rem', marginTop: '2rem' }}>Carregando paciente...</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '1.125rem', marginTop: '2rem' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '48rem', margin: 'auto', padding: '1rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>{id ? 'Editar Paciente' : 'Novo Paciente'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="nome" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Nome:</label>
          <input
            id="nome"
            name="nome"
            placeholder="Nome completo"
            value={paciente.nome}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="senha" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Senha:</label>
          <input
            id="senha"
            name="senha"
            placeholder="Senha (necessária para novos cadastros)"
            value={paciente.senha}
            onChange={handleChange}
            type="password"
            required={!id} // Senha é obrigatória apenas para novos cadastros
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="cpf" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>CPF:</label>
          <input
            id="cpf"
            name="cpf"
            placeholder="CPF"
            value={paciente.cpf}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="telefone" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Telefone:</label>
          <input
            id="telefone"
            name="telefone"
            placeholder="(XX) XXXXX-XXXX"
            value={paciente.telefone}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.625rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', marginRight: '0.5rem' }}
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => navigate('/pacientes')}
            style={{ backgroundColor: '#6b7280', color: 'white', padding: '0.625rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}