import React, { useState, useEffect, useCallback } from 'react'
import api from '../../services/api'
import { FiRefreshCcw, FiPower, FiEdit } from 'react-icons/fi'
import { useAuth } from '../../context/Auth'
import './styles.css'
import ParecerTecnico from '../../components/Modal/ParecerTecnico'

interface IProcesso {
  id: string
  parecer: string
  responsaveis: []
}

const Finalizador: React.FC = () => {
  const { user, signOut } = useAuth()
  const [data, setData] = useState<IProcesso[]>([])
  const [refresh, setRefresh] = useState(false)
  const [processo, setProcesso] = useState({} as IProcesso)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    api.get('processo/pendentes').then(response => {
      setData(response.data)
    })
  }, [refresh])

  const refreshScreen = useCallback(() => setRefresh(!refresh), [refresh])

  const closeModal = useCallback(() => {
    setOpenModal(false)
    refreshScreen()
  }, [refreshScreen])

  const edit = useCallback((processo) => {
    setProcesso(processo)
    setOpenModal(true)
  }, [])

  if (openModal) {
    return <ParecerTecnico onClose={closeModal} processo={processo} />
  }

  return (
    <div className="dashboard-container">
      <header>
        <button type="button" onClick={refreshScreen}>
          <FiRefreshCcw size={18} color="#00B0FF"></FiRefreshCcw>
        </button>
        <button type="button" onClick={() => signOut()}>
          <FiPower size={18} color="#00B0FF"></FiPower>
        </button>

        <span>Bem vindo {user.nome}</span>
      </header>

      <h1>Processos pendentes</h1>

      <ul>
        {data.map(processo => (
          <li key={processo.id}>
            <strong>Parecer:</strong>
            <p>{processo.parecer}</p>

            <button type="button" onClick={() => edit(processo)}>
              <FiEdit size={20} color="#00B0FF"></FiEdit>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Finalizador;