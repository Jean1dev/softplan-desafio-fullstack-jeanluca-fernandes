import React, { useState, useCallback, useEffect } from 'react';
import api from '../../../services/api'
import '../../commons/styles.modal.css'

interface IUsuario {
    id: string
    tipoUsuario: string
    nome: string
    login: string
    senha: string
  }

interface IProps {
    onClose(): void
    usuario?: IUsuario | null
}

const UsuarioModal: React.FC<IProps> = ({ onClose, usuario }) => {
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [tipoUsuario, setTipoUsuario] = useState('ADMIN')

    useEffect(() => {
        if (usuario) {
            setId(usuario.id)
            setNome(usuario.nome)
            setLogin(usuario.login)
            setSenha(usuario.senha)
            setTipoUsuario(usuario.tipoUsuario)
        }
    }, [usuario])

    const handleRegister = useCallback((event) => {
        event.preventDefault()
        if (!id) {
            api.post('usuarios', {
                nome,
                login,
                senha,
                tipoUsuario
            }).then(() => {
                alert('Usuario criado com sucesso')
                onClose()
            })
        } else {
            api.put('usuarios', {
                id,
                nome,
                login,
                senha,
                tipoUsuario
            }).then(() => {
                alert('Usuario alterado com sucesso')
                onClose()
            })
        }
        
    }, [nome, login, senha, tipoUsuario, id, onClose])

    return (
        <div className="modal.container">
            <div className="modal" id="modal">
                <h2>Adicionando Usuario</h2>
                <div className="content">
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
                <div className="actions">
                    <button className="toggle-button" onClick={onClose}>
                        fechar
            </button>
                </div>
            </div>

        </div>
    );
}

export default UsuarioModal;