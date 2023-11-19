
import './SearchBar.css'
import {SearchBarContext} from "../../Context/SearchBarContext.jsx";
import {useContext, useState} from "react";


function SearchBar({ source, iconSrc, clickHandler }) {
    const { handleSearch , searchTerm} = useContext(SearchBarContext);
    const [selectedParam, setSelectedParam]= useState('')

    function submit(e) {
        e.preventDefault()
        handleSearch(selectedParam)
    }


    return (
        <div className="parent-container-searchbar">
            <form onSubmit={submit} className="searchbar-container media-area">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={clickHandler}
                    placeholder="Search..."
                />
                <select className="select-class " value={selectedParam} onChange={(e) => setSelectedParam(e.target.value)}>
                    <option className="media-select" value="name">Name</option>
                    <option className="media-select" value="developer">Developer</option>
                    <option className="media-select" value="genre">Genre</option>
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
