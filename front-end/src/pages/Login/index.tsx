import React, { useState, useCallback } from 'react'
import img from '../../assets/login_capa.png'
import { FiLogIn } from 'react-icons/fi'
import logo from '../../logo.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import './styles.css'

const Login: React.FC = () => {
    const { signIn } = useAuth()
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')

    const handleLogin = useCallback((event) => {
        event.preventDefault()
        signIn({ login, senha })
    }, [login, senha, signIn])

    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Genrenciador de processos"></img>
                <form onSubmit={handleLogin}>
                    <h1> Faca seu login</h1>

                    <input
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        placeholder="Seu login"
                    />

                    <input
                        value={senha}
                        type="password"
                        onChange={e => setSenha(e.target.value)}
                        placeholder="Sua senha"
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#00B0FF" />
                        Nao tenho cadastro
                     </Link>
                </form>
            </section>
            <img src={img} alt="processos"></img>
        </div>
    );
}

export default Login;