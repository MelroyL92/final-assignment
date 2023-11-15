import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import './SearchResultPage.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {SearchBarContext} from "../../Context/SearchBarContext.jsx";
import Button from "../../components/Forms/Button/Button.jsx";
import {AuthContext} from "../../Context/AuthContext.jsx";


function SearchResultPage () {
    const {gameResult, handleSearch,searchTerm,handleChange} = useContext(SearchBarContext);
    const {isAuthenticated, logout} = useContext(AuthContext)


    return (

        <main className="parent-container">
            <div className="nav-class">
                <nav className="nav-class">
                    <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home" />
                    <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                    <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                    <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About" />
                    {isAuthenticated ? (
                        <>
                            <NavLinks to="/ProfilePage" iconSrc="src/assets/user-thin.svg" altText="login icon" text="profile" />
                            <Button className="button-class-nav" type="button" clickHandler={logout} name="Logout" label="Logout" iconSrc="src/assets/sign-out-thin.svg" altText="sign-out"/>
                        </>
                    ) : (
                        <>
                            <NavLinks to="/Login" iconSrc="src/assets/user-thin.svg" altText="login icon" text="Login" />
                            <NavLinks to="/Register" iconSrc="src/assets/alien-thin.svg" altText="register icon" text="Register" />
                        </>
                    )}
                </nav>
            </div>
            <div className="page-wrapper">
            <div className="head-container">
                <h1>search result page</h1>
                <SearchBar onSearch={handleSearch} clickHandler={handleChange} searchValue={searchTerm} source="src/assets/rawg-logo_750x430.jpg" iconSrc="src/assets/magnifying-glass-thin.svg"/>
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