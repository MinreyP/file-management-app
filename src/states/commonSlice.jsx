import fileMockup from '../files-mockup';
import folderMockup from '../folders-mockup';

const folderData = localStorage.getItem("folderTree");
const fileData = localStorage.getItem("allFiles");

const useFileStore = (set, get) => ({
    files: fileData ? fileData : fileMockup,
    folderTree: folderData ? folderData : folderMockup,
    onLocation: null,
    clipboard: null,
    activeFile: null,
    showMenu: false,
    modal: { isShow: false },
    menuPosition: { x: 32, y: 32 },
    handle_menu: (e) => {
        e.preventDefault();
        const contextMenuHeight = get().onLocation.content.id === 'root' ? 32 : 240;
        const adjustHeight = e.clientY - contextMenuHeight / 2;
        set(() => ({ menuPosition: { x: e.clientX + 32, y: adjustHeight } }))
        set(() => ({ showMenu: true }));
    },
    handle_close: () => { set({ showMenu: false }) },
    handle_modal_close: () => { set({ modal: { isShow: false } }) },
    handle_location: (obj) => {
        if (obj.type === 'file') {
            set({ activeFile: obj.content })
        }
        set({ onLocation: obj })
    },
    handle_edit_action: (actionKey) => {
        if (actionKey.includes('rename') || actionKey.includes('add')) {
            set(() => ({ modal: { isShow: true, type: actionKey } }));
            return;
        }
        get()[actionKey]();
    }
})

export default useFileStore;