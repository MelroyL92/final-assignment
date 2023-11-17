import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import './About.css'
import {useContext} from "react";
import {AuthContext} from "../../Context/AuthContext.jsx";
import Button from "../../components/Forms/Button/Button.jsx";


function About () {

    const {isAuthenticated, logout} = useContext(AuthContext)


    return (


        <main className="parent-container">
            <nav className="nav-class">
                <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home" />
                <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About" />
                {isAuthenticated ? (
                    <>
                        <NavLinks to="/ProfilePage" iconSrc="src/assets/user-thin.svg" altText="login icon" text="profile" />
                        <Button className="nav-button" type="button" clickHandler={logout} name="Logout" label="Logout" iconSrc="src/assets/sign-out-thin.svg" altText="sign-out"/>
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
                    <img className="image-main" src="src/assets/21978.jpg" alt="gaming-keyboard"/>
                </div>
            <div className="text-class">
                <h1>About</h1>
                <p>This is a project designed for a frontend assignment by the NOVI hogeschool.</p>
                <p>Studied there for a few months before starting this assignment and spend about 3 weeks of work to get this done</p>

                <h2>About the website</h2>
                <p>This website was created as a test to see what i could do but the purpose of the website remains as follows:</p>
                <p>The purpose has been to create a website for people to organise their games.To be able to create lists so that they could figure out a few things like</p>
                <ul>
                    <li>What do i want to play next</li>
                    <li>What is my initial thought of the game after seeing it online?</li>
                    <li>What grade would i give this game</li>
                </ul>
                <p>With that in mind it might be easier to go down a list of games you would like to play without having to have doubts about it</p>
                <p>I hope you enjoy this simple website!</p>
                <h4>Keep in mind to delete your local storage when completely done as this website does not have a backend (yet)</h4>
            </div>
            </div>


        </main>
    )
}

export default About