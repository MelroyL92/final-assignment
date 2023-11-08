import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import './SearchResultPage.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {SearchBarContext} from "../../Context/SearchBarContext.jsx";


function SearchResultPage () {
    const {gameResult, handleSearch} = useContext(SearchBarContext);


    return (

        <main className="parent-container">
            <div className="nav-class">
            <NavLinks/>
            </div>
            <div className="page-wrapper">
            <div className="head-container">
                <h1>search result page</h1>
                <SearchBar onSearch={handleSearch}/>
            </div>
            <section className="result-class">
                <ul className="list-wrapper">
                    {gameResult && gameResult.results && gameResult.results.length > 0 && gameResult.results.map((game)=> (
                    <li key={game.id} className="list-items">
                        <Link to={`/GameDetail/${game.id}`}>{game.name}</Link>
                        <p>released: {game.released}</p>

                    </li>
                    ))}
                </ul>
            </section>
            </div>
        </main>
    )
}

export default SearchResultPage;