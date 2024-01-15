import { create } from "zustand";
import commonSlice from "./commonSlice";
import folderSlice from "./folderSlice";
import fileSlice from "./fileSlice";

const useBoundStore = create((...a) => ({
    ...commonSlice(...a),
    ...folderSlice(...a),
    ...fileSlice(...a)
}))

export default useBoundStore;