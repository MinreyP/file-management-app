import PropTypes from 'prop-types';
import '../FileItem/FileItem.css';

const FileItem = ({ file }) => {

    return (
        <li className="file-item">
            {file.name}{file.type}
        </li>
    )
}

FileItem.propTypes = {
    file: PropTypes.object
}

export default FileItem