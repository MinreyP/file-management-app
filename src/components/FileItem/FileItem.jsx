import PropTypes from 'prop-types';

const FileItem = ({ file }) => {

    return (
        <li>
            {file.name}{file.type}
        </li>
    )
}

FileItem.propTypes = {
    file: PropTypes.object
}

export default FileItem