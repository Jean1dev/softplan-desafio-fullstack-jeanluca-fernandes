import React from 'react';
import './styles.css'

interface IProps {
    onClose(): void
}

const UsuarioModal: React.FC<IProps> = ({ onClose, children }) => {

    return (
        <div className="modal.container">
            <div className="modal" id="modal">
                <h2>Modal Window</h2>
                <div className="content">{children}</div>
                <div className="actions">
                    <button className="toggle-button" onClick={onClose}>
                        close
            </button>
                </div>
            </div>

        </div>
    );
}

export default UsuarioModal;