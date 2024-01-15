import PropTypes from 'prop-types';
import '../FileItem/FileItem.css';
import useBoundStore from '../../states/boundStore';

const FileItem = ({ file }) => {
    const callMenu = useBoundStore(state => state.handle_menu);
    const updateLocation = useBoundStore(state => state.handle_location);

    const handleContextMenu = e => {
        updateLocation({ type: 'file', id: file.id });
        callMenu(e);
    }

    return (
        <li className="file-item" onContextMenu={handleContextMenu}>
            {file.name}{file.type}
        </li>
    )
}

FileItem.propTypes = {
    file: PropTypes.object
}

export default FileItem