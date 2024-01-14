import '../DisplayArea/DisplayArea.css';
import SearchBar from '../SearchBar/SearchBar';
import CodeBlock from '../CodeBlock/CodeBlock';

const DisplayArea = () => {
    return (
        <div className="display-area">
            <SearchBar />
            <CodeBlock />
        </div>
    )
}

export default DisplayArea