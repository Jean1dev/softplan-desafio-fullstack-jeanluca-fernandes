import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/Auth'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiRefreshCcw } from 'react-icons/fi'
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

  useEffect(() => {
    api.get('usuarios').then(response => {
      setData(response.data)
    })
  }, [])

  const remover = useCallback(id => {

  }, [])

  if (openModal) {
    return <UsuarioModal onClose={() => setOpenModal(false)}/>
  }

  return (
    <div className="profile-container">
      <header>
        <span>Bem vindo {user.nome}</span>

        <Link className="button" to="#" onClick={() => setOpenModal(true)}>Cadastre um novo caso</Link>
        {/* <button className="button" type="button" onClick={() => setOpenModal(true)}>Cadastre um novo Usuario</button> */}
        <button type="button" onClick={() => signOut()}>
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
            <strong>CASO:</strong>
            <p>{usuario.nome}</p>
            <strong>DECRICAO:</strong>
            <p>{usuario.tipoUsuario}</p>
            {/* <strong>VALOR R$</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.value)}</p> */}

            <button type="button" onClick={() => remover(usuario.id)}>
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default Admin;