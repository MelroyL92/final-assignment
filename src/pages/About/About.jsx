import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import './About.css'
import {useContext} from "react";
import {AuthContext} from "../../Context/AuthContext.jsx";
import Button from "../../components/Button/Button.jsx";


function About () {
    const {isAuthenticated, logout} = useContext(AuthContext)


    return (
        <main className="parent-container">
            <nav className="nav-class color-style">
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
            <div className="img-searchbar-container">
                <div className="image">
                    <img className="image-polygon" src="src/assets/21978.jpg" alt="gaming-keyboard"/>
                </div>
                <div className="text-class-about-page">
                    <h1>About</h1>
                    <p>This is a project designed as a result of a frontend assignment by the NOVI hogeschool.</p>
                    <p>Studied there for a few months before starting this assignment and spend about 3 weeks of work to get this done</p>
                    <p>This website was created as a test to see what i could do but the purpose of the website remains as follows:</p>
                    <p>The purpose has been to create a website for people to organise their games.To be able to create lists so that they could figure out a few things like:</p>
                    <ul>
                        <li>What do i want to play next</li>
                        <li>What is my initial thought of the game after seeing it online?</li>
                        <li>What grade would i give this game</li>
                    </ul>
                    <p>With that in mind it might be easier to go down a list of games you would like to play without having to have doubts about it</p>
                    <h3>Keep in mind to delete your local storage when completely done as this website does not have a backend (yet)</h3>
                </div>
            </div>


        </main>
    )
}

export default About