import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import '../../components/Navlinks/Navlinks.css'
import './Homepage.css'
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import {useContext} from "react";
import {SearchBarContext} from "../../Context/SearchBarContext.jsx";


function Homepage () {
    const {handleSearch} = useContext(SearchBarContext);



    return (
        <main className="parent-container">
              <div className="nav-class">
                <NavLinks/>
              </div>
            <section className= "section-container">
                <div className="img-searchbar-container">
                    <div className="image">
                        <img className="homepage-image" src="src/assets/32077.jpg" alt="gaming-keyboard"/>
                    </div>
                    <SearchBar onSearch={handleSearch}/>
                </div>

            </section>
            <footer>

            </footer>



        </main>
    )
}

export default Homepage