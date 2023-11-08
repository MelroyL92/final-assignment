import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import './About.css'

function About () {




    return (


        <main className="parent-container">
            <div className="nav-class">
                <NavLinks/>
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

        </main>
    )
}

export default About