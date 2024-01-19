import '../EditMenu/EditMenu.css';
import useBoundStore from '../../states/boundStore';
import { defaultItems, rootItems } from './availableItems';

const EditMenu = () => {
    const { content } = useBoundStore(state => state.onLocation);
    const clipboardContent = useBoundStore(state => state.clipboard);
    const onClose = useBoundStore(state => state.handle_close);
    const menuPosition = useBoundStore(state => state.menuPosition);
    const callEditAction = useBoundStore(state => state.handle_edit_action);

    const renderMenuItems = () => {
        if (content.id === 'root') {
            return rootItems.map((item, i) => (
                <div className="menu-item" key={i} onClick={() => handleClick(item.action_key)}>{item.name}</div>
            ))
        } else {
            return defaultItems.map((item, i) => {
                if (clipboardContent && item.action_key === 'paste') {
                    const { name, extension } = clipboardContent.content;
                    const pasteHint = clipboardContent.type === 'folder' ? `Paste Folder '${name}'` : `Paste File '${name}${extension}'`;
                    return <div className="menu-item" key={i} onClick={() => handleClick(item.action_key)}>{pasteHint}</div>
                } else {
                    return <div className="menu-item" key={i} onClick={() => handleClick(item.action_key)}>{item.name}</div>
                }
            })
        }
    }
    const handleClick = (actionKey) => {
        callEditAction(actionKey);
        onClose();
    }

    return (
        <div className="edit-menu" style={{ position: 'absolute', top: menuPosition.y, left: menuPosition.x, zIndex: 5 }}>
            {renderMenuItems()}
        </div>
    )
}

export default EditMenu