import React, { useState, useCallback } from 'react';
import api from '../../../services/api'
import '../../commons/styles.modal.css'

interface IProcesso {
    id: string
    parecer: string
    responsaveis: []
  }

interface IProps {
    onClose(): void
    processo?: IProcesso 
}

const ParecerTecnico: React.FC<IProps> = ({ onClose, processo }) => {
    const id = processo?.id
    const [parecer, setParecer] = useState('')

    const handleRegister = useCallback((event) => {
        event.preventDefault()
        api.put('processo/finalizar', {
            id,
            parecer
        }).then(() => {
            alert('Parecer informado')
            onClose()
        })
        
    }, [id, parecer, onClose])

    return (
        <div className="modal.container">
            <div className="modal" id="modal">
                <h2>Informar Parecer tecnico</h2>
                <div className="content">
                    <form onSubmit={handleRegister}>
                    <textarea placeholder="Descricao" value={parecer} onChange={e => setParecer(e.target.value)} />
                        <button className="button" type="submit">Enviar</button>
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

export default ParecerTecnico;