
const useFolderSlice = (set, get) => ({
    add_folder: (obj) => {
        const folderIndex = get().onLocation.content.id;
        const newFolderTree = { ...get().folderTree };

        const addFolder = (folder, keyIndex) => {
            if (folder && folder[keyIndex]) {
                folder[keyIndex].sub_folders = { ...folder[keyIndex].sub_folders, ...obj };
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
        console.log(newFolderTree);
        set(state => ({ ...state, folderTree: newFolderTree }));
    },
    copy_folder: () => {
    },
    delete_folder: () => {
        const folderIndex = get().onLocation.content.id;
        const newFolderTree = { ...get().folderTree };

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
        deleteFolderByKey(newFolderTree, folderIndex);
        console.log(newFolderTree);
        set(state => ({ ...state, folderTree: newFolderTree }));
    },
    cut_folder: () => {
        const folderIndex = get().onLocation.content.id;
        const newFolderTree = { ...get().folderTree };
        const extractValue = {};

        const extractValueByKey = (folder, keyIndex) => {
            if (folder && folder[keyIndex]) {
                extractValue[keyIndex] = { ...folder[keyIndex] };
                delete folder[keyIndex];
                return true;
            }

            for (const key in folder) {
                if (extractValueByKey(folder[key].sub_folders, keyIndex)) {
                    return true;
                }
            }

            return false;
        };
        extractValueByKey(newFolderTree, folderIndex);
        set(state => ({ ...state, clipboard: { ...state.onLocation }, folderTree: newFolderTree }));
    },
    paste_folder: () => {
        const addItem = get().clipboard.content;
        set(state => {
            state.add_folder(addItem);
            return state;
        })
    },
    rename_folder: (newName) => {
        const onFolderIndex = get().onLocation.content.id;
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
        updateFolderName(newFolderTree, onFolderIndex);
        console.log(newFolderTree);
        // set(() => ({ folderTree: newFolderTree }));
    }
});

export default useFolderSlice;