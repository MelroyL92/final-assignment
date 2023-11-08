import './Wishlist.css'
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {useContext} from "react";
import {Link, useParams} from "react-router-dom";
import Forms from "../Forms/Forms.jsx";

function Wishlist () {
    const {wishlist} = useContext(WishlistContext);

    const {name} = useParams()

    return (
        <section className="main-wrapper">
            {wishlist.map((titleList, index) => (
                <div key={index} >
                    <div className="wishlist-overview-wrapper">
                       <span className="image-wrapper-wishlist"><img src="https://placehold.in/300x200@2x.png/dark" alt="placeholder_image"/></span>
                        <span> <Link to={`/SpecificWishlist/${titleList.name}`}><h2>{titleList.name}</h2></Link></span>
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