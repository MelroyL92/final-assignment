import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import './SearchResultPage.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {SearchBarContext} from "../../Context/SearchBarContext.jsx";
import Button from "../../components/Button/Button.jsx";
import {AuthContext} from "../../Context/AuthContext.jsx";
import Loader from "../../components/Loader/Loader.jsx";


function SearchResultPage () {
    const {gameResult, handleSearch,handleChange, searchTerm, loading, error} = useContext(SearchBarContext);
    const {isAuthenticated, logout} = useContext(AuthContext);


    return (

        <main className="parent-container">
            <nav className="color-style">
                <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home" />
                <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About" />
                {isAuthenticated ? (
                    <>
                        <NavLinks to="/ProfilePage" iconSrc="src/assets/user-thin.svg" altText="login icon" text="profile" />
                        <Button className="nav-button color-style min-width-1025px-links" type="button" clickHandler={logout} name="Logout" label="Logout" iconSrc="src/assets/sign-out-thin.svg" altText="sign-out"/>
                    </>
                ) : (
                    <>
                        <NavLinks to="/Login" iconSrc="src/assets/user-thin.svg" altText="login icon" text="Login" />
                        <NavLinks to="/Register" iconSrc="src/assets/alien-thin.svg" altText="register icon" text="Register" />
                    </>
                )}
            </nav>
            <div className="page-wrapper-search-result">
                <div className="head-container">
                    <h1>search result page</h1>
                    <SearchBar onSearch={handleSearch} clickHandler={handleChange} searchValue={searchTerm} source="src/assets/rawg-logo_750x430.jpg" iconSrc="src/assets/magnifying-glass-thin.svg"/>
                </div>
                <section>
                    {loading && <div className="loader-search-result"><Loader/></div>}
                    {error && <p>Error occurred during the search.</p>}
                    <ul className="list-wrapper-search-result">
                        {gameResult && gameResult.results && gameResult.results.length > 0 && gameResult.results.map((game)=> (
                            <li key={game.id} className="list-items-search-result color-style min-width-1025px-links">
                                <h4><Link to={`/GameDetail/${game.id}`} className="link-style">{game.name}</Link></h4>
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