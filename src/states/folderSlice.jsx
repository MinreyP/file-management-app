const findFolderAndUpdate = (obj, index, callback) => {
    if (obj && obj[index]) {
        callback(obj, index);
        return true;
    }

    for (const key in obj) {
        if (findFolderAndUpdate(obj[key].sub_folders, index, callback)) {
            return true;
        }
    }

    return false;
};

const useFolderSlice = (set, get) => ({
    add_folder: (obj) => {
        const folderIndex = get().onLocation.content.id;
        let newFolderTree = { ...get().folderTree };
        const newFolder = {
            [obj.id]: {
                name: obj.name,
                sub_folders: null
            }
        };

        const addFolder = (folder, keyIndex) => {
            findFolderAndUpdate(folder, keyIndex, (obj, key) => {
                obj[key].sub_folders = { ...obj[key].sub_folders, ...newFolder };
            })
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
        let newFolderTree = { ...get().folderTree };
        const keyIndex = folderIndex || get().onLocation.content.id;

        const deleteFolderByKey = (folder, keyToDelete) => {
            findFolderAndUpdate(folder, keyToDelete, (obj, id) => {
                delete obj[id];
            })
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
        let newFolderTree = { ...get().folderTree };
        const updateFolderName = (folder, keyToUpdate) => {
            findFolderAndUpdate(folder, keyToUpdate, (obj, key) => {
                obj[key].name = newName;
            });
        };
        updateFolderName(newFolderTree, folderIndex)
        set(() => ({ folderTree: newFolderTree }));
    }
});

export default useFolderSlice;