import useBoundStore from '../../states/boundStore';
import '../DisplayArea/DisplayArea.css';
import { AiOutlineFolderOpen } from "react-icons/ai";
import SearchBar from '../SearchBar/SearchBar';
import CodeBlock from '../CodeBlock/CodeBlock';

const DisplayArea = () => {
    const activeFile = useBoundStore(state => state.activeFile);
    const id = activeFile?.id;
    const parent = activeFile?.parent;
    const allFiles = useBoundStore(state => state.files);
    const file = allFiles[parent]?.find(file => file.id === id);

    return (
        <div className="display-area">
            <SearchBar files={allFiles} />
            {activeFile ? <CodeBlock displayFile={file} /> : (
                <div className="display-content">
                    <div className="icon-wrapper">
                        <AiOutlineFolderOpen />
                    </div>
                    <p>select a file to start editing</p>
                </div>)}
        </div>
    )
}

export default DisplayArea