import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import './SearchResultPage.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


function SearchResultPage () {
    const apiKey = 'cfbdc29c24df4c6ead2de38a04292a7e'
    const [error, toggleError] = useState(false)
    const [gameResult, setGameResult] = useState([])

     const searchAPI = async (searchTerm) => {
        toggleError(false);

        try {
            const response = await axios.get(`https://api.rawg.io/api/games?search=${searchTerm}&key=${apiKey}`)
            const responseData = response.data;
            setGameResult(responseData)
            console.log(responseData)
        } catch (e) {
            console.error(e)
            toggleError(true)
        }

    }

    return (

        <main className="parent-container">
            <div className="nav-class">
            <NavLinks/>
            </div>
            <div className="page-wrapper">
            <div className="head-container">
                <h1>search result page</h1>
                <SearchBar onSearch={searchAPI}/>
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