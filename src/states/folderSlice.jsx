const folderActions = {
    add_folder: () => console.log(`add folder`),
    copy_folder: () => console.log(`copy folder`),
    delete_folder: () => console.log(`delete folder`),
    cut_folder: () => console.log(`cut folder`),
    paste_folder: () => console.log(`paste folder`),
    rename_folder: () => console.log(`rename folder`)
}

const useFolderSlice = set => ({
    handleFolderAction: (actionKey, ...a) => {
        const actionFunction = folderActions[actionKey];
        if (actionFunction) {
            actionFunction(set, ...a)
        } else {
            throw new Error(`Unknown action key: ${actionKey}`)
        }
    }
});

export default useFolderSlice;