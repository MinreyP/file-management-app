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
            <h2 className="folder-title">{rootName}</h2>
            {subFolders ? loopingThroughObject(subFolders) : 'start adding file content'}
        </div>
    )
}

export default FileArea