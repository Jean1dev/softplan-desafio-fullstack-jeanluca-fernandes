import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/Auth';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { FiRefreshCcw, FiPower, FiEdit } from 'react-icons/fi';
import './styles.css'

interface IProcesso {
  id: string
  parecer: string
  responsaveis: []
}

const Triador: React.FC = () => {
  const history = useHistory()
  const { user, signOut } = useAuth()
  const [data, setData] = useState<IProcesso[]>([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    api.get('processo').then(response => {
      setData(response.data)
    })
  }, [refresh])

  const refreshScreen = useCallback(() => setRefresh(!refresh), [refresh])

  const update = useCallback((processo) => {
    history.push('add-processo', { processo })
  }, [history])

  return (
    <div className="profile-container">
      <header>
        <span>Bem vindo {user.nome}</span>

        <Link className="button" to="/add-processo" >Cadastre um novo processo</Link>
        <button type="button" onClick={refreshScreen}>
          <FiRefreshCcw size={18} color="#00B0FF"></FiRefreshCcw>
        </button>
        <button type="button" onClick={() => signOut()}>
          <FiPower size={18} color="#00B0FF"></FiPower>
        </button>

      </header>

      <h1>Processos</h1>

      <ul>
        {data.map(processo => (
          <li key={processo.id}>
            <strong>Parecer:</strong>
            <p>{processo.parecer}</p>

            <button type="button" onClick={() => update(processo)}>
              <FiEdit size={20} color="#00B0FF"></FiEdit>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Triador;