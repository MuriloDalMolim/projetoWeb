import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function ConvenioList() {
  const [convenios, setConvenios] = useState([]);
  const navigate = useNavigate();

  const fetchConvenios = async () => {
    try {
      const res = await api.get('/convenios');
      setConvenios(res.data);
    } catch {
      alert('Erro ao buscar convênios');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmar exclusão?')) {
      await api.delete(`/convenios/${id}`);
      fetchConvenios();
    }
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  return (
    <div>
      <h2>Convênios</h2>
      <button onClick={() => navigate('/convenios/novo')}>Novo Convênio</button>
      {convenios.length === 0 ? (
        <p>Nenhum convênio encontrado.</p>
      ) : (
        <ul>
          {convenios.map(c => (
            <li key={c.id}>
              {c.nome} - {c.descricao}
              {' '}
              <button onClick={() => navigate(`/convenios/${c.id}`)}>Editar</button>
              {' '}
              <button onClick={() => handleDelete(c.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/home')}>Voltar</button>
    </div>
  );
}