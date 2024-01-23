import '../EditMenu/EditMenu.css';
import useBoundStore from '../../states/boundStore';
import { folderActions, fileActions, rootActions } from './availableActions';

const EditMenu = () => {
    const { type, content } = useBoundStore(state => state.onLocation);
    const clipboard = useBoundStore(state => state.clipboard);
    const onClose = useBoundStore(state => state.handle_close);
    const menuPosition = useBoundStore(state => state.menuPosition);
    const callEditAction = useBoundStore(state => state.handle_edit_action);
    const menuItems = type === 'folder' ? folderActions : fileActions;

    const renderMenuItems = () => {
        if (content.id === 'root') {
            return rootActions.map((item, i) => (
                <div className="menu-item" key={i} onClick={() => handleClick(item.action_key)}>{item.name}</div>
            ))
        } else {
            return menuItems.map((item, i) => {
                return <div className="menu-item" key={i} onClick={() => handleClick(item.action_key)}>{item.name}</div>
            })
        }
    }
    const handleClick = (actionKey) => {
        callEditAction(actionKey);
        onClose();
    }

    return (
        <div className="edit-menu" style={{ position: 'absolute', top: menuPosition.y, left: menuPosition.x, zIndex: 5 }}>
            {clipboard?.type === 'folder' && (
                <div className="menu-item" onClick={() => handleClick('paste_folder')}>Paste Folder {clipboard.content.name}</div>)}
            {clipboard?.type === 'file' && (
                <div className="menu-item" onClick={() => handleClick('paste_file')}>Paste File {clipboard.content.name}.{clipboard.content.extension}</div>)}
            {renderMenuItems()}
        </div>
    )
}

export default EditMenu