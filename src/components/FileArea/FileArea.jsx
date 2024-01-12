import folderTree from "../../folders-mockup";
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
                    <div key={key}>
                        <FolderItem folderName={subFolder.name} folderID={key} />
                        {loopingThroughObject(subFolder.sub_folders)}
                    </div>
                );
            } else {
                return (
                    <div key={key}>
                        <FolderItem folderName={subFolder.name} folderID={key} />
                    </div>
                );
            }
        });
    }

    return (
        <div className="file-area">
            <h2>{rootName}</h2>
            {subFolders ? loopingThroughObject(subFolders) : 'start adding file content'}
        </div>
    )
}

export default FileArea