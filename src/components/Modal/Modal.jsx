import '../Modal/Modal.css';
import useBoundStore from '../../states/boundStore';

const Modal = () => {
    const { type } = useBoundStore(state => state.modal);
    const performItem = useBoundStore(state => state.onLocation);
    const closeModal = useBoundStore(state => state.handle_modal_close);
    const renameFolder = useBoundStore(state => state.rename_folder);
    const addFolder = useBoundStore(state => state.add_folder);
    const renameFile = useBoundStore(state => state.rename_file);
    const addFile = useBoundStore(state => state.add_file);

    const handleRename = (e) => {
        e.preventDefault();
        let newName = e.target.elements['file-name'].value;
        if (performItem.type === 'folder') {
            renameFolder(performItem.content.id, newName);
        }
        if (performItem.type === 'file') {
            renameFile(performItem.parent, performItem.content.id, newName);
        }
        closeModal();
    }

    const handleAdd = (e) => {
        e.preventDefault();
        let genID = Date.now();
        let name = e.target.elements['file-name'].value;
        // let extension = e.target.elements['file-extension'].value;
        if (performItem.type === 'folder') {
            addFolder({ id: genID, name });
        }
        closeModal();
    }

    const renderModalForm = () => {
        if (type.includes('add')) {
            if (performItem.type === 'folder') {
                return (
                    <form onSubmit={handleAdd}>
                        <label htmlFor="fileName">Folder Name</label>
                        <input type="text" id="fileName" name="file-name" required />
                        <button type="submit">Add</button>
                    </form>)
            } else {
                return (
                    <form onSubmit={handleAdd}>
                        <label htmlFor="fileName">File Name</label>
                        <input id="fileName" name="file-name" type="text" required />
                        <label htmlFor="fileExtension">File Format</label>
                        <input name="file-extension" id="fileExtension" type="text" placeholder='.txt, .js, .css...' required />
                        <button type="submit">Add</button>
                    </form>)
            }
        } else {
            return (
                <form onSubmit={handleRename}>
                    <label htmlFor="fileName">Update Name</label>
                    <input type="text" id="fileName" name="file-name" placeholder={performItem.content.name} required />
                    <button type="submit">Save</button>
                </form>)
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <p className="modal-title">{type.includes('rename') ? `edit name` : `add new ${performItem.type}`}</p>
                {renderModalForm()}
            </div>
        </div>
    )
}

export default Modal