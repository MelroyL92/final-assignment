import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import {useContext} from "react";
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {Link, useParams} from "react-router-dom";
import './SpecificWishlist.css'
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Grade from "../../helpers/Grade/Grade.jsx";


function SpecificWishlist() {
    const { listName } = useParams();
    const {wishlist} = useContext(WishlistContext);


    // Filter the specific list by name
    const specificList = wishlist.find((titleList) => titleList.name === listName);

    if (!specificList) {
        // Handle the case where the specific list is not found
        return <div>List not found</div>;
    }

    return (
        <main className="parent-container">
            <div className="nav-class">
                <NavLinks/>
            </div>
            <div className="page-wrapper">
                <div className="head-container">
                    <h1>{specificList.name}</h1>
                    <SearchBar/>
                </div>
                <ul>
                    {specificList.games.map((game) => (
                        <li key={game.id} className="wishlist-overview-wrapper" >
                            <span><img src={game.background_image} alt="game-image"/></span>
                        <div>
                            <Link to={`/GameDetail/${game.id}`}>{game.name}</Link>

                        </div>
                            <Grade/>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default  SpecificWishlist