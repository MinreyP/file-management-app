import '../Modal/Modal.css';
import useBoundStore from '../../states/boundStore';

const Modal = () => {
    const onItem = useBoundStore(state => state.onLocation);
    const closeModal = useBoundStore(state => state.handle_modal_close);
    const { type, content } = onItem;

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-container">
                <p className="modal-title">{type === 'file' ? `Add / Edit File` : `Add / Edit Folder`}</p>
                <p>{`Hiii It's ${type}-${content.name} Who Dis?`}</p>
            </div>
        </div>
    )
}

export default Modal