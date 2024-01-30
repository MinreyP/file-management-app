import useBoundStore from '../../states/boundStore';
import '../FileArea/FileArea.css';
import FolderItem from "../FolderItem/FolderItem"


const FileArea = () => {
    const folderTree = useBoundStore(state => state.folderTree);
    const closeMenu = useBoundStore(state => state.handle_close);
    const callMenu = useBoundStore(state => state.handle_menu);
    const updateLocation = useBoundStore(state => state.handle_location);

    const loopingThroughObject = (obj) => {
        if (!obj) return;

        return Object.keys(obj).map(key => {
            let folder = obj[key];
            if (folder.sub_folders) {
                return (
                    <>
                        <FolderItem folderName={folder.name} folderID={key} />
                        <ul>{loopingThroughObject(folder.sub_folders)}</ul>
                    </>
                );
            } else {
                return (
                    <>
                        <FolderItem folderName={folder.name} folderID={key} />
                    </>
                );
            }
        });
    };

    const handleClick = (e) => {
        const { classList, dataset } = e.target;
        if (classList.contains('folder-title')) {
            updateLocation({ type: 'folder', content: { id: dataset.folder, name: dataset.name } });
            return;
        }
        if (classList.contains('file-item')) {
            updateLocation({ type: 'file', content: { id: dataset.file, parent: dataset.parent } });
            return;
        }
        if (classList.contains('file-area')) {
            console.log('close all');
            closeMenu();
            return;
        }
    };

    const handleContext = (e) => {
        const { classList, dataset } = e.target;
        if (classList.contains('folder-title')) {
            updateLocation({ type: 'folder', content: { id: dataset.folder, name: dataset.name } });
            callMenu(e);
            return;
        }
        if (classList.contains('file-item')) {
            updateLocation({ type: 'file', content: { id: dataset.file, name: dataset.name, parent: dataset.parent } });
            callMenu(e);
            return;
        }
    };

    return (
        <div className="file-area"
            onClick={(e) => handleClick(e)}
            onContextMenu={(e) => handleContext(e)}>
            <h1 style={{ fontSize: '2rem' }}>File Management App by MP</h1>
            <p>Edit folders and files by right click on the target item.</p>
            <small style={{ display: "block", marginTop: ".5rem" }}>*Root folder can only be renamed, deletion is not allowed*</small>
            {loopingThroughObject(folderTree)}
        </div>
    )
}

export default FileArea