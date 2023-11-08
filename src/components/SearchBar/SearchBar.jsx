
import './SearchBar.css'
import {useContext} from 'react';
import {SearchBarContext} from "../../Context/SearchBarContext.jsx";

function SearchBar() {
    const {searchTerm, handleSearch, handleChange} = useContext(SearchBarContext);



    return (
        <div className="searchbar-container">
            <form>
                <input className="searchbar-style" type="text" value={searchTerm} onChange={handleChange} />
                <button className="button-style" type="button" onClick={handleSearch}>Search</button>
            </form>
            <span><img className="icon-wrapper" src="src/assets/rawg-logo_750x430.jpg" alt="API logo" /></span>
        </div>
    );
}


export default SearchBar;
