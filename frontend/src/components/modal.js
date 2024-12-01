import Modal from 'react-modal';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Exemplo Modal"
            ariaHideApp={false}
        >
            <p>Tem certeza que deseja excluir este atendimento?</p>
            <button onClick={onRequestClose}>Cancelar</button>
            <button onClick={onConfirm}>Confirmar</button>
        </Modal>
    );
};


export default ConfirmModal;