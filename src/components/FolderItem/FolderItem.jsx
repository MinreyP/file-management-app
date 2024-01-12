import PropTypes from 'prop-types';
import filesData from '../../files-mockup';
import FileItem from '../FileItem/FileItem';

const FolderItem = ({ folderName, folderID }) => {

    const linkingFiles = filesData[folderID];


    if (linkingFiles && linkingFiles.length !== 0) {
        return (
            <>
                <h3>{folderName}</h3>
                <ul>
                    {linkingFiles.map(file => <FileItem key={file.id} file={file} />)}
                </ul>
            </>
        )
    } else {
        return (
            <>
                <h3>{folderName}</h3>
                <p>The folder is empty.</p>
            </>
        )
    }
}

FolderItem.propTypes = {
    folderName: PropTypes.string.isRequired,
    folderID: PropTypes.string.isRequired
}

export default FolderItem