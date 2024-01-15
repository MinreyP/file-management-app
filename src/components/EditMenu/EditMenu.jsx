import '../EditMenu/EditMenu.css';
import useBoundStore from '../../states/boundStore';
import { fileActions, folderActions, rootAction } from './availableActions';

const EditMenu = () => {
    const type = useBoundStore(state => state.onLocation.type);
    const onClose = useBoundStore(state => state.handle_close);
    const menuPosition = useBoundStore(state => state.menuPosition);
    const callFileAction = useBoundStore(state => state.handleFileAction);
    const callFolderAction = useBoundStore(state => state.handleFolderAction);

    const renderMenuItems = type => {
        if (type === 'folder') {
            return folderActions.map((action, i) => (
                <div className="menu-item" key={i} onClick={() => handleClick(action.action_key)}>{action.name}</div>
            ))
        }
        if (type === 'file') {
            return fileActions.map((action, i) => (
                <div className="menu-item" key={i} onClick={() => handleClick(action.action_key)}>{action.name}</div>
            ))
        } else {
            return rootAction.map((action, i) => (
                <div className="menu-item" key={i} onClick={() => handleClick(action.action_key)}>{action.name}</div>
            ))
        }
    }
    const handleClick = (actionKey) => {
        if (type === 'folder' || type === 'root') {
            callFolderAction(actionKey)
        }
        if (type === 'file') {
            callFileAction(actionKey)
        }
        onClose();
    }

    return (
        <div className="edit-menu" style={{ position: 'absolute', top: menuPosition.y, left: menuPosition.x, zIndex: 5 }}>
            {renderMenuItems(type)}
        </div>
    )
}

export default EditMenu