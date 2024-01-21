
const useFolderSlice = (set, get) => ({
    add_folder: (obj) => {
        const folderIndex = get().onLocation.content.id;
        const newFolderTree = { ...get().folderTree };
        const newFolder = {
            [obj.id]: {
                name: obj.name,
                sub_folders: null
            }
        };

        const addFolder = (folder, keyIndex) => {
            if (folder && folder[keyIndex]) {
                folder[keyIndex].sub_folders = { ...folder[keyIndex].sub_folders, ...newFolder };
                return true;
            }

            for (const key in folder) {
                if (addFolder(folder[key].sub_folders, keyIndex)) {
                    return true;
                }
            }

            return false;
        };
        addFolder(newFolderTree, folderIndex);
        set(state => ({ ...state, folderTree: newFolderTree }));
    },
    copy_folder: () => {
        // gen a new id for the folder, add '-copy' at the end of the file name
        // then store it into the clipboard
        const genID = Date.now();
        const toClipboardContent = { id: genID, name: `${get().onLocation.content.name}-copy` };
        set(() => ({ clipboard: { ...get().onLocation, content: toClipboardContent } }));
    },
    delete_folder: (folderIndex) => {
        const newFolderTree = { ...get().folderTree };
        const keyIndex = folderIndex || get().onLocation.content.id;

        const deleteFolderByKey = (folder, keyToDelete) => {
            if (folder && folder[keyToDelete]) {
                delete folder[keyToDelete];
                return true;
            }

            for (const key in folder) {
                if (deleteFolderByKey(folder[key].sub_folders, keyToDelete)) {
                    return true;
                }
            }

            return false;
        };
        deleteFolderByKey(newFolderTree, keyIndex);
        set(state => ({ ...state, folderTree: newFolderTree }));
    },
    cut_folder: () => {
        // basically just call folder_delete and move location info to clipboard
        const onFolderIndex = get().onLocation.content.id;
        set(state => ({ clipboard: { ...state.onLocation } }));
        set(state => {
            state.delete_folder(onFolderIndex);
            return state;
        })
    },
    paste_folder: () => {
        const addItem = get().clipboard.content;
        set(() => ({ clipboard: null }));
        set(state => {
            state.add_folder(addItem);
            return state;
        })
    },
    rename_folder: (folderIndex, newName) => {
        const newFolderTree = { ...get().folderTree };
        const updateFolderName = (folder, keyToRename) => {
            if (folder && folder[keyToRename]) {
                folder[keyToRename].name = newName;
                return true;
            }

            for (const key in folder) {
                if (updateFolderName(folder[key].sub_folders, keyToRename)) {
                    return true;
                }
            }

            return false;
        };
        updateFolderName(newFolderTree, folderIndex);
        set(() => ({ folderTree: newFolderTree }));
    }
});

export default useFolderSlice;