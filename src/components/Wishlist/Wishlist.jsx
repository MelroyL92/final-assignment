import './Wishlist.css'
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import Forms from "../Forms/Forms.jsx";

function Wishlist () {
    const {wishlist} = useContext(WishlistContext);


    return (
        <section className="main-wrapper">
            {wishlist.map((titleList, index) => (
                <div key={index}>
                    <div className="wishlist-overview-wrapper">
                        <img src="https://placehold.in/300x200@2x.png/dark" alt="placeholder_image"/>
                    <Link to="/SpecificWishlist"><h2>{titleList.name}</h2></Link>
                    <ul>
                        {titleList.games.map((game)=> (
                            <li key={game.id}></li>
                    ))}
                    </ul>
                        <Forms/>
                    </div>
                </div>
                ))}

        </section>
    )

}

export default Wishlist