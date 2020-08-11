import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/Auth'
import { Link } from 'react-router-dom'
import { FiPower, FiTrash2, FiRefreshCcw, FiEdit } from 'react-icons/fi'
import './styles.css'
import api from '../../services/api';
import UsuarioModal from '../../components/Modal/Usuario';

interface IUsuario {
  id: string
  tipoUsuario: string
  nome: string
  login: string
  senha: string
}

const Admin: React.FC = () => {
  const { user, signOut } = useAuth()
  const [data, setData] = useState<IUsuario[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [usuarioEdit, setUsuarioEdit] = useState(null)

  useEffect(() => {
    api.get('usuarios').then(response => {
      setData(response.data)
    })
  }, [refresh])

  const refreshScreen = useCallback(() => setRefresh(!refresh), [refresh])

  const update = useCallback(usuario => {
    setOpenModal(true)
    setUsuarioEdit(usuario)
  }, [])

  const insertNewUser = useCallback(() => {
    setOpenModal(true)
    setUsuarioEdit(null)
  }, [])

  const remover = useCallback(id => {
    api.delete(`usuarios/${id}`).then(() => setRefresh(!refresh))
  }, [refresh])

  if (openModal) {
    return <UsuarioModal onClose={() => setOpenModal(false)} usuario={usuarioEdit}/>
  }

  return (
    <div className="profile-container">
      <header>
        <span>Bem vindo {user.nome}</span>

        <Link className="button" to="#" onClick={insertNewUser}>Cadastre um novo usuario</Link>
        <button type="button" onClick={refreshScreen}>
          <FiRefreshCcw size={18} color="#00B0FF"></FiRefreshCcw>
        </button>
        <button type="button" onClick={() => signOut()}>
          <FiPower size={18} color="#00B0FF"></FiPower>
        </button>

      </header>

      <h1>Usuarios</h1>

      <ul>
        {data.map(usuario => (
          <li key={usuario.id}>
            <strong>Nome:</strong>
            <p>{usuario.nome}</p>
            <strong>Tipo:</strong>
            <p>{usuario.tipoUsuario}</p>

            <button type="button" onClick={() => update(usuario)}>
              <FiEdit size={20} color="#00B0FF"></FiEdit>
            </button>
            
            <button type="button" onClick={() => remover(usuario.id)}>
              <FiTrash2 size={20} color="#00B0FF"></FiTrash2>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default Admin;