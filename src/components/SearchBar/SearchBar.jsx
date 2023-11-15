
import './SearchBar.css'
import {SearchBarContext} from "../../Context/SearchBarContext.jsx";
import {useContext, useState} from "react";


function SearchBar({ source, searchValue, iconSrc, clickHandler }) {
    const { handleSearch } = useContext(SearchBarContext);
    const [selectedParam, setSelectedParam]= useState('')

    function submit(e) {
        e.preventDefault()
        handleSearch(selectedParam)

    }

    return (
        <div className="parent-container-searchbar">
            <form onSubmit={submit} className="searchbar-container">
                <input
                    type="text"
                    value={searchValue}
                    onChange={clickHandler}
                    placeholder="Search..."
                />
                <select value={selectedParam} onChange={(e) => setSelectedParam(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="developer">Developer</option>
                    <option value="genre">Genre</option>
                    <option value="publisher">Publisher</option>
                </select>
                <button type="submit">
                    <img className="button-image" src={iconSrc} alt="search icon" />
                </button>
            </form>
            <span>
        <img className="icon-wrapper" src={source} alt="API logo" />
      </span>
        </div>
    );
}

export default SearchBar;

import './SearchBar.css'
