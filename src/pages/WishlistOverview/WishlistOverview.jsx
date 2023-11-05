import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import './WishlistOverview.css'
import Wishlist from "../../components/Wishlist/Wishlist.jsx";


function WishlistOverview () {

    return (

        <main className="parent-container">
            <div className="nav-class">
                <NavLinks/>
            </div>
            <div className="page-wrapper">
                <div className="head-container">
                    <h1>Wishlist</h1>
                    <SearchBar/>
                </div>
                <Wishlist/>
            </div>

        </main>
    )
}

export default WishlistOverview