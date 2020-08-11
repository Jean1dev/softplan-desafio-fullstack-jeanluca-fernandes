import React from 'react';
import { useAuth } from '../../context/Auth';
import Admin from '../ADMIN';
import Triador from '../TRIADOR';
import Finalizador from '../FINALIZADOR';

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  if (user.tipoUsuario === 'ADMIN') {
    return <Admin/>
  }

  if (user.tipoUsuario === 'TRIADOR') {
    return <Triador/>
  }

  return <Finalizador/>
}

export default Dashboard;