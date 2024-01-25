import '../Modal/Modal.css';
import useBoundStore from '../../states/boundStore';
import getDefaultContent from '../../getDefaultContent';

const Modal = () => {
    const { type } = useBoundStore(state => state.modal);
    const performItem = useBoundStore(state => state.onLocation);
    const closeModal = useBoundStore(state => state.handle_modal_close);
    const renameFolder = useBoundStore(state => state.rename_folder);
    const addFolder = useBoundStore(state => state.add_folder);
    const renameFile = useBoundStore(state => state.rename_file);
    const addFile = useBoundStore(state => state.add_file);

    const handleClose = (e) => {
        const { classList } = e.target;
        if (classList.contains('modal-backdrop')) {
            closeModal();
        }
    }

    const handleRename = (e) => {
        e.preventDefault();
        const newName = e.target.elements['file-name'].value;
        if (performItem.type === 'folder') {
            renameFolder(performItem.content.id, newName);
        }
        if (performItem.type === 'file') {
            renameFile(performItem.content.parent, performItem.content.id, newName);
        }
        closeModal();
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const genID = Date.now();
        const name = e.target.elements['file-name'].value;
        if (type.includes('folder')) {
            addFolder({ id: genID, name });
        }
        if (type.includes('file')) {
            const extension = e.target.elements['file-extension'].value.replace(/[^a-zA-Z]/g, '').toLowerCase();
            const content = getDefaultContent(extension);
            let fileOBJ = {
                name,
                extension,
                content,
                id: genID.toString(),
            };
            addFile(fileOBJ);
        }
        closeModal();
    }

    const renderModalForm = () => {
        if (type.includes('add')) {
            if (type.includes('folder')) {
                return (
                    <>
                        <p className="modal-title">add new folder</p>
                        <form onSubmit={handleAdd}>
                            <label htmlFor="fileName">Folder Name</label>
                            <input type="text" id="fileName" name="file-name" required />
                            <button type="submit">Add</button>
                        </form>
                    </>
                )
            } else {
                return (
                    <>
                        <p className="modal-title">add new file</p>
                        <form onSubmit={handleAdd}>
                            <label htmlFor="fileName">File Name</label>
                            <input id="fileName" name="file-name" type="text" required />
                            <label htmlFor="fileExtension">File Format</label>
                            <input name="file-extension" id="fileExtension" type="text" placeholder='.txt, .js, .css...' required />
                            <button type="submit">Add</button>
                        </form>
                    </>
                )
            }
        } else {
            return (
                <>
                    <p className="modal-title">update {performItem.type} name</p>
                    <form onSubmit={handleRename}>
                        <label htmlFor="fileName">{performItem.type} Name</label>
                        <input type="text" id="fileName" name="file-name" placeholder={performItem.content.name} required />
                        <button type="submit">Save</button>
                    </form>
                </>
            )
        }
    }

    return (
        <div className="modal-backdrop" onClick={(e) => handleClose(e)}>
            <div className="modal-container">
                {renderModalForm()}
            </div>
        </div>
    )
}

export default Modal