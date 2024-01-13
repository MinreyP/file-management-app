import PropTypes from 'prop-types';
import '../FolderItem/FolderItem.css';
import { AiOutlineDown } from "react-icons/ai";
import { useState } from 'react';
import filesData from '../../files-mockup';
import FileItem from '../FileItem/FileItem';

const FolderItem = ({ folderName, folderID }) => {

    const [isOpen, setIsOpen] = useState(false);
    const linkingFiles = filesData[folderID];
    const iconDeg = isOpen ? null : { transform: 'rotate(-90deg)' };

    if (linkingFiles && linkingFiles.length !== 0) {
        return (
            <div className={`folder-container ${isOpen ? 'open' : ''}`}>
                <h3 className="folder-title" onClick={() => setIsOpen(!isOpen)}>
                    <span className="icon-box">
                        <AiOutlineDown style={iconDeg} />
                    </span>
                    {folderName}
                </h3>
                <ul>
                    {linkingFiles.map(file => <FileItem key={file.id} file={file} />)}
                </ul>
            </div>
        )
    } else {
        return (
            <div className={`folder-container ${isOpen ? 'open' : ''}`}>
                <h3 className="folder-title" onClick={() => setIsOpen(!isOpen)}>
                    <span className="icon-box">
                        <AiOutlineDown style={iconDeg} />
                    </span>
                    {folderName}
                </h3>
                <p>The folder is empty.</p>
            </div>
        )
    }
}

FolderItem.propTypes = {
    folderName: PropTypes.string.isRequired,
    folderID: PropTypes.string.isRequired
}

export default FolderItem