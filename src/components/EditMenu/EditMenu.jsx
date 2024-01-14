import PropTypes from 'prop-types';
import '../EditMenu/EditMenu.css';

const EditMenu = ({ editType, onClose }) => {

    const defaultItems = ['rename', 'copy', 'paste', 'cut', 'delete'];
    const renderItems = editType === 'root' ? ['rename'] : defaultItems;

    const handleItemSelected = (item) => {
        onClose();
        console.log(`Selected Action: ${item}`)
    }

    return (
        <div className={`edit-menu`}>
            {renderItems.map((item, i) => (
                <div className="menu-item" key={i} onClick={() => handleItemSelected(item)}>
                    {item}
                </div>
            ))}
        </div>
    )
}

EditMenu.propTypes = {
    editType: PropTypes.string,
    onClose: PropTypes.func
}

export default EditMenu