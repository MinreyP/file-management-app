import folderTree from "../../folders-mockup";
import '../FileArea/FileArea.css';
import FolderItem from "../FolderItem/FolderItem"


const FileArea = () => {

    const rootName = folderTree.root.name;
    const subFolders = folderTree.root.sub_folders;

    const loopingThroughObject = (obj) => {
        if (!obj) return;

        return Object.keys(obj).map(key => {
            let subFolder = obj[key];
            if (subFolder.sub_folders) {
                return (
                    <>
                        <FolderItem folderName={subFolder.name} folderID={key} />
                        <ul>{loopingThroughObject(subFolder.sub_folders)}</ul>
                    </>
                );
            } else {
                return (
                    <>
                        <FolderItem folderName={subFolder.name} folderID={key} />
                    </>
                );
            }
        });
    }

    return (
        <div className="file-area">
            <h1 style={{ fontSize: '2rem' }}>File Management App by MP</h1>
            <p>Edit folders and files by right click on the target item.</p>
            <h2 className="folder-title" style={{ marginTop: '1rem' }}>{rootName}</h2>
            {subFolders ? loopingThroughObject(subFolders) : 'start adding file content'}
        </div>
    )
}

export default FileArea