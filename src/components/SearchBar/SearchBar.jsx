import '../SearchBar/SearchBar.css';
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
    const results = [
        {
            "name": "README",
            "type": ".md",
            "id": "b345",
            "content": "Test Content",
        },
        {
            "name": "Some Text",
            "type": ".txt",
            "id": "c123",
            "content": "Some Text Content",
        }
    ];

    return (
        <div className="search-bar-wrapper">
            <input className="search-bar" type="text" placeholder="Search File Name" name="search" id="file-search" />
            <span className="search-bar-icon"><AiOutlineSearch /></span>
            {/* <div className="search-results">
                {results.length > 0 && results.map(result =>
                    <div className="result-item" key={result.id}>{result.name}{result.type}</div>)}
            </div> */}
        </div>
    )
}

export default SearchBar