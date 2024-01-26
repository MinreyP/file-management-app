import PropTypes from 'prop-types';
import '../SearchBar/SearchBar.css';
import { useState } from 'react';
import useBoundStore from '../../states/boundStore';
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ files }) => {
    const [keyword, setKeyword] = useState('index');
    const updateLocation = useBoundStore(state => state.handle_location);
    const dataToArray = Object.values(files).flat();
    const result = dataToArray.filter(file => file.name.toLowerCase().includes(keyword.toLowerCase()));

    return (
        <div className="search-bar-wrapper">
            <input className="search-bar" type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search File Name"
                name="search" id="file-search" />
            <span className="search-bar-icon"><AiOutlineSearch /></span>
            <div className="search-results">
                {result.length > 0 && result.map(file =>
                    <div className="result-item" key={file.id}
                        onClick={updateLocation({ type: 'file', content: { id: file.id, parent: file.parent } })}>
                        {file.name}.{file.extension}
                    </div>)}
            </div>
        </div>
    )
}

SearchBar.propTypes = {
    files: PropTypes.object
}

export default SearchBar