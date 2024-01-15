import fileMockup from '../files-mockup';
import folderMockup from '../folders-mockup';

const folderData = localStorage.getItem("folderTree");
const fileData = localStorage.getItem("allFiles");

const useFileStore = set => ({
    files: fileData ? fileData : fileMockup,
    folderTree: folderData ? folderData : folderMockup,
    onLocation: null,
    clipboard: [],
    activeFile: '',
    showMenu: false,
    menuPosition: { x: 0, y: 0 },
    handle_menu: (e) => {
        e.preventDefault();
        const contextMenuWidth = 150;
        const contextMenuHeight = 240;
        const adjustedX = e.clientX - (contextMenuWidth / 2);
        const adjustedY = e.clientY - contextMenuHeight;
        set(() => ({ menuPosition: { x: adjustedX, y: adjustedY } }))
        set(() => ({ showMenu: true }));
    },
    handle_close: () => { set({ showMenu: false }) },
    handle_location: (obj) => { set({ onLocation: obj }) }
})

export default useFileStore;