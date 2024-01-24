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
        let newFolderTree = get().folderTree;

        // construct a new folder object. If the folder already existed, spread out its own sub folders
        let newFolder = {
            [obj.id]: {
                name: obj.name,
                sub_folders: obj.sub_folders || null
            }
        };

        const addFolder = (folder, keyIndex) => {
            findFolderAndUpdate(folder, keyIndex, (obj, key) => {
                obj[key].sub_folders = { ...obj[key].sub_folders, ...newFolder };
            })
        };
        addFolder(newFolderTree, folderIndex);
        set(() => ({ folderTree: { ...newFolderTree } }));
    },
    copy_folder: () => {
        // gen a new id for the folder, add '-copy' at the end of the file name
        // then store it into the clipboard
        const folderTree = get().folderTree;
        const onFolderIndex = get().onLocation.content.id;
        let copiedContent;

        const copyFolderByKey = (folder, keyToExtract) => {
            findFolderAndUpdate(folder, keyToExtract, (obj, id) => {
                copiedContent = { ...obj[id], id: Date.now(), name: `${obj[id].name}-copy` }
            })
        }

        copyFolderByKey(folderTree, onFolderIndex);
        set(() => ({ clipboard: { type: 'folder', content: copiedContent } }));
    },
    delete_folder: (folderIndex) => {
        let newFolderTree = get().folderTree;
        const keyIndex = folderIndex || get().onLocation.content.id;

        const deleteFolderByKey = (folder, keyToDelete) => {
            findFolderAndUpdate(folder, keyToDelete, (obj, id) => {
                delete obj[id];
            })
        };
        deleteFolderByKey(newFolderTree, keyIndex);
        set(() => ({ folderTree: { ...newFolderTree } }));
    },
    cut_folder: () => {
        // basically just call folder_delete and move extracted info to the clipboard
        const folderTree = get().folderTree;
        const onFolderIndex = get().onLocation.content.id;
        let extractedContent;

        const extractFolderByKey = (folder, keyToExtract) => {
            findFolderAndUpdate(folder, keyToExtract, (obj, id) => {
                extractedContent = { ...obj[id], id };
            })
        }

        extractFolderByKey(folderTree, onFolderIndex);

        set(state => {
            state.delete_folder(onFolderIndex);
            return { clipboard: { type: 'folder', content: extractedContent } };
        })
    },
    paste_folder: () => {
        const addItem = get().clipboard.content;
        set(state => {
            state.add_folder(addItem);
            return { clipboard: null };
        })
    },
    rename_folder: (folderIndex, newName) => {
        let newFolderTree = get().folderTree;
        const updateFolderName = (folder, keyToUpdate) => {
            findFolderAndUpdate(folder, keyToUpdate, (obj, key) => {
                obj[key].name = newName;
            });
        };
        updateFolderName(newFolderTree, folderIndex)
        set(() => ({ folderTree: { ...newFolderTree } }));
    }
});

export default useFolderSlice;