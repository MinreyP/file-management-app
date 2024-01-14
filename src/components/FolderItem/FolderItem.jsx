import PropTypes from 'prop-types';
import '../FolderItem/FolderItem.css';
import { AiOutlineDown } from "react-icons/ai";
import { useState } from 'react';
import filesData from '../../files-mockup';
import FileItem from '../FileItem/FileItem';
import EditMenu from '../EditMenu/EditMenu';

const FolderItem = ({ folderName, folderID }) => {

    const [isOpen, setIsOpen] = useState(false);
    const linkingFiles = filesData[folderID];
    const iconDeg = isOpen ? null : { transform: 'rotate(-90deg)' };

    // Edit Menu Operation
    const [showEditMenu, setShowEditMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const handleContext = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setShowEditMenu(true);
    }

    const handleClose = () => {
        setShowEditMenu(false);
    }

    if (linkingFiles && linkingFiles.length !== 0) {
        return (
            <div className={`folder-container ${isOpen ? 'open' : ''}`}>
                <h3 className="folder-title" onClick={() => setIsOpen(!isOpen)} onContextMenu={handleContext}>
                    <span className="icon-box">
                        <AiOutlineDown style={iconDeg} />
                    </span>
                    {folderName}
                </h3>
                <ul>
                    {linkingFiles.map(file => <FileItem key={file.id} file={file} />)}
                </ul>
                {showEditMenu && (
                    <EditMenu
                        onClose={handleClose}
                        editType='folder'
                        style={{ top: menuPosition.y, left: menuPosition }}
                    />)}
            </div>
        )
    } else {
        return (
            <div className={`folder-container ${isOpen ? 'open' : ''}`}>
                <h3 className="folder-title" onClick={() => setIsOpen(!isOpen)} onContextMenu={handleContext}>
                    <span className="icon-box">
                        <AiOutlineDown style={iconDeg} />
                    </span>
                    {folderName}
                </h3>
                <p>The folder is empty.</p>
                {showEditMenu && (
                    <EditMenu
                        onClose={handleClose}
                        editType='folder'
                        style={{ position: 'absolute', top: menuPosition.y, left: menuPosition.x }}
                    />)}
            </div>
        )
    }
}

FolderItem.propTypes = {
    folderName: PropTypes.string.isRequired,
    folderID: PropTypes.string.isRequired
}

export default FolderItem