import fileMockup from '../files-mockup';
import folderMockup from '../folders-mockup';

const folderData = localStorage.getItem("folderTree");
const fileData = localStorage.getItem("allFiles");

const useFileStore = (set, get) => ({
    files: fileData ? fileData : fileMockup,
    folderTree: folderData ? folderData : folderMockup,
    onLocation: null,
    clipboard: [],
    activeFile: '',
    showMenu: false,
    menuPosition: { x: 32, y: 32 },
    handle_menu: (e) => {
        e.preventDefault();
        const contextMenuHeight = get().onLocation.type === 'root' ? 32 : 240;
        const adjustHeight = e.clientY - contextMenuHeight;
        set(() => ({ menuPosition: { x: e.clientX + 32, y: adjustHeight } }))
        set(() => ({ showMenu: true }));
    },
    handle_close: () => { set({ showMenu: false }) },
    handle_location: (obj) => { set({ onLocation: obj }) }
})

export default useFileStore;