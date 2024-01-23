const useFileSlice = (set, get) => ({
    rename_file: (folder, fileID, newName) => {
        let newFiles = { ...get().files };
        let updatedArr = newFiles[folder].map(file => {
            if (file.id === fileID) {
                file.name = newName;
            }
            return file;
        })
        newFiles[folder] = updatedArr;
        set(() => ({ files: newFiles }));
    },
    add_file: (obj) => {
        let newFiles = { ...get().files };
        const folderIndex = get().onLocation.type === 'folder' ? get().onLocation.content.id : 'root';
        if (newFiles[folderIndex]) {
            newFiles[folderIndex].push(obj);
        } else {
            newFiles[folderIndex] = [obj];
        }
        set(() => ({ files: newFiles }));
    },
    copy_file: () => {
        const genID = Date.now();
        const copiedContent = { ...get().onLocation.content, id: genID };
        set(state => ({ clipboard: { ...state.onLocation, content: copiedContent } }));
    },
    delete_file: () => {
        let newFiles = { ...get().files };
        const { parent } = get().onLocation;
        const fileID = get().onLocation.content.id;
        const updatedArr = newFiles[parent].filter(file => file.id !== fileID);
        newFiles[parent] = updatedArr;
        set(state => ({ ...state, files: newFiles, activeFile: null }));
    },
    cut_file: () => {
        set(state => ({ clipboard: state.onLocation }))
        get().delete_file();
    },
    paste_file: () => {
        const { content } = get().clipboard;
        set(state => {
            state.add_file(content);
            return { ...state, clipboard: null };
        })
    },
})

export default useFileSlice;