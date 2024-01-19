import useBoundStore from '../../states/boundStore';
import '../FileArea/FileArea.css';
import EditMenu from '../EditMenu/EditMenu';
import FolderItem from "../FolderItem/FolderItem"


const FileArea = () => {
    const folderTree = useBoundStore(state => state.folderTree);
    const showEditMenu = useBoundStore(state => state.showMenu);

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
    }

    return (
        <div className="file-area">
            <h1 style={{ fontSize: '2rem' }}>File Management App by MP</h1>
            <p>Edit folders and files by right click on the target item.</p>
            {folderTree.root.sub_folders ? loopingThroughObject(folderTree) : (<p>start adding file content</p>)}
            {showEditMenu && <EditMenu />}
        </div>
    )
}

export default FileArea