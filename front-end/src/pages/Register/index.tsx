import React, { useState, useCallback } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../logo.svg'
import './styles.css'
import api from '../../services/api'

const Register: React.FC = () => {
    const history = useHistory()
    const [nome, setNome] = useState('')
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [tipoUsuario, setTipoUsuario] = useState('ADMIN')

    const handleRegister = useCallback((event) => {
        event.preventDefault()
        api.post('usuarios', {
            nome,
            login,
            senha,
            tipoUsuario
        }).then(() => {
            alert('Usuario criado com sucesso faça o login')
            history.push('')
        })
        
    }, [nome, login, senha, tipoUsuario])

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Processos"></img>

                    <h1>Faça seu cadastro</h1>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#00B0FF" />
                        Voltar
                     </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                    <input placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
                    <input placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                    <select name="opcoes" onChange={e => setTipoUsuario(e.target.value)}>
                        <option value="ADMIN">ADMINISTRADOR</option>
                        <option value="TRIADOR">TRIADOR</option>
                        <option value="FINALIZADOR">FINALIZADOR</option>
                    </select>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;