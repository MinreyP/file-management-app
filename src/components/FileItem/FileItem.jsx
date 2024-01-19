import PropTypes from 'prop-types';
import '../FileItem/FileItem.css';
import useBoundStore from '../../states/boundStore';

const FileItem = ({ parent, file }) => {
    const callMenu = useBoundStore(state => state.handle_menu);
    const updateLocation = useBoundStore(state => state.handle_location);

    const handleContextMenu = e => {
        updateLocation({ type: 'file', content: file, parent });
        callMenu(e);
    }

    const handleClick = () => {
        updateLocation({ type: 'file', content: file, parent });
    }

    return (
        <li className="file-item" onContextMenu={handleContextMenu} onClick={handleClick}>
            {file.name}{file.extension}
        </li>
    )
}

FileItem.propTypes = {
    file: PropTypes.object,
    parent: PropTypes.string
}

export default FileItem