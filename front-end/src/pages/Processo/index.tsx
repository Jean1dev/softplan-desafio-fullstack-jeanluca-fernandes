import React, { useCallback, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import img from '../../assets/add_processo.png'
import './styles.css'
import api from '../../services/api';

interface IUsuario {
    id: string
    tipoUsuario: string
    nome: string
    login: string
    senha: string
}

const Processo: React.FC = () => {
    const history = useHistory()
    const [idProcesso, setIdProcesso] = useState('')
    const [parecer, setParecer] = useState('')
    const [usuarios, setUsuarios] = useState<IUsuario[]>([])
    const [usuariosAdicionados, setUsuariosAdicionados] = useState<IUsuario[]>([])
    const [usuario, setUsuario] = useState('')
    const [title, setTitle] = useState('Cadastre um novo processo')

    const submitForm = useCallback(event => {
        event.preventDefault()
        if (idProcesso) {
            api.put('processo', {
                parecer,
                responsaveis: usuariosAdicionados
            }).then(() => {
                alert('processo alterado')
                history.push('dashboard')
            })
        } else {
            api.post('processo', {
                parecer,
                responsaveis: usuariosAdicionados
            }).then(() => {
                alert('processo adicionado')
                history.push('dashboard')
            })
        }
    }, [parecer, usuariosAdicionados, history, idProcesso])

    useEffect(() => {
        api.get('usuarios').then(response => {
            setUsuarios(response.data)
        })

        if (history.location.state) {
            setTitle('Alterando um processo')
            //@ts-ignore
            const { processo } = history.location.state
            setParecer(processo.parecer)
            setIdProcesso(processo.id)
        }

    }, [history.location.state])

    const addUser = useCallback(() => {
        const usuarioSelecionado = usuarios.filter(user => user.id === usuario)
        setUsuariosAdicionados([...usuariosAdicionados, usuarioSelecionado[0]])
        alert('Adicionado')
    }, [usuariosAdicionados, usuario, usuarios])

    return (
        <div className="processos-container">
            <div className="content">
                <section>
                    <h1>{title}</h1>
                    <p>Sobre</p>
                    <img src={img} alt="Processo"></img>
                    <Link className="back-link" to="/dashboard">
                        <FiArrowLeft size={16} color="#00B0FF" />
                        Voltar
                     </Link>
                </section>

                <form onSubmit={submitForm}>
                    <textarea placeholder="Descricao" value={parecer} onChange={e => setParecer(e.target.value)} />
                    <select name="opcoes" onChange={e => setUsuario(e.target.value)}>
                        {usuarios.map(user => (
                            <option key={user.id} value={user.id}>{user.nome}</option>
                        ))}
                    </select>
                    <FiPlus size={25} color="#00B0FF" onClick={addUser} />
                    <span>Adicionar usuario</span>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Processo;