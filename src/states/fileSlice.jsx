const useFileSlice = (set, get) => ({
    rename_file: (folder, fileID, newName) => {
        let newFiles = get().files;
        let updatedArr = newFiles[folder].map(file => {
            if (file.id === fileID) {
                file.name = newName;
            }
            return file;
        })
        newFiles[folder] = updatedArr;
        set(() => ({ files: { ...newFiles } }));
    },
    add_file: (obj) => {
        let newFiles = get().files;
        const folderIndex = get().onLocation.content.id;
        if (newFiles[folderIndex]) {
            newFiles[folderIndex].push({ ...obj, parent: folderIndex });
        } else {
            newFiles[folderIndex] = [{ ...obj, parent: folderIndex }];
        }
        set(() => ({ files: { ...newFiles } }));
    },
    copy_file: () => {
        const genID = Date.now();
        const { parent, id } = get().onLocation.content;
        const allFiles = get().files;
        const targetFile = allFiles[parent].find(file => file.id === id);
        const copiedContent = { ...targetFile, id: genID.toString(), name: `${targetFile.name}-copy` };
        set(() => ({ clipboard: { type: 'file', content: copiedContent } }));
    },
    delete_file: () => {
        let newFiles = { ...get().files };
        const { parent, id } = get().onLocation.content;
        const updatedArr = newFiles[parent].filter(file => file.id !== id);
        newFiles[parent] = updatedArr;
        set(() => ({ files: newFiles, activeFile: null }));
    },
    cut_file: () => {
        const { parent, id } = get().onLocation.content;
        const allFiles = get().files;
        const targetFile = allFiles[parent].find(file => file.id === id);
        set(() => ({ clipboard: { type: 'file', content: targetFile } }))
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