import useBoundStore from '../../states/boundStore';
import '../DisplayArea/DisplayArea.css';
import SearchBar from '../SearchBar/SearchBar';
import CodeBlock from '../CodeBlock/CodeBlock';

const DisplayArea = () => {
    const activeFile = useBoundStore(state => state.activeFile);

    return (
        <div className="display-area">
            <SearchBar />
            {activeFile && <CodeBlock />}
        </div>
    )
}

export default DisplayArea