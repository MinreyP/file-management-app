import PropTypes from 'prop-types';
import '../FileItem/FileItem.css';
import useBoundStore from '../../states/boundStore';

const FileItem = ({ file }) => {
    const callMenu = useBoundStore(state => state.handle_menu);
    const updateLocation = useBoundStore(state => state.handle_location);

    const handleContextMenu = e => {
        updateLocation({ ...file, type: 'file' });
        callMenu(e);
    }

    return (
        <li className="file-item" onContextMenu={handleContextMenu}>
            {file.name}{file.extension}
        </li>
    )
}

FileItem.propTypes = {
    file: PropTypes.object
}

export default FileItem