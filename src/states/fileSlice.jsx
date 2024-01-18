const useFileSlice = (set, get) => ({
    rename_file: () => console.log(`rename file`),
    add_file: () => console.log(`add file`),
    copy_file: () => {
        const genID = Date.now();
        const fileOBJ = { ...get().onLocation, id: genID }
        set(() => ({ clipboard: [fileOBJ] }))
    },
    delete_file: () => console.log(`delete file`),
    cut_file: () => console.log(`cut file`),
    paste_file: () => {
        const onFolderIndex = get().onLocation.id;
        const newFiles = [...get().files[onFolderIndex], ...get().clipboard];
        // set(() => ({ files: { ...get().files, valueOfIndex: [...valueOfIndex, ...get().clipboard] } }));
        console.log({ newFiles: { ...get().files, onFolderIndex: newFiles } });
    },
})

export default useFileSlice;