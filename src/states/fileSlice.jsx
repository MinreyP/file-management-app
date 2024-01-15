const fileActions = {
    add_file: () => console.log(`add file`),
    copy_file: () => console.log(`copy file`),
    delete_file: () => console.log(`delete file`),
    cut_file: () => console.log(`cut file`),
    paste_file: () => console.log(`paste file`),
    rename_file: () => console.log(`rename file`)
}

const useFileSlice = set => ({
    handleFileAction: (actionKey, ...a) => {
        const actionFunction = fileActions[actionKey];
        if (actionFunction) {
            actionFunction(set, ...a)
        } else {
            throw new Error(`Unknown action key: ${actionKey}`)
        }
    }
})

export default useFileSlice;