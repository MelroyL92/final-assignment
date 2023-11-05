import { useState} from "react";
import './SearchBar.css'
import { useNavigate } from 'react-router-dom';

function SearchBar ({onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }


    const handleSearch = () => {
        if (onSearch) {
            // Call the onSearch function with the search criteria
            onSearch(searchTerm);
            // Navigate to the search results page (if needed)
            navigate('/SearchResultPage');
        }
    };


            return (
        <div className="searchbar-container">
            <form>
                <input className="searchbar-style" type="text" value={searchTerm} onChange={handleChange}/>
                <button className="button-style" type="button" onClick={handleSearch}>search</button>
            </form>
            <img src="src/assets/rawg-logo_750x430.jpg" alt="API logo"/>
        </div>
    );

}

export default SearchBar