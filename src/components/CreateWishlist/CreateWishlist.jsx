import {useContext, useState} from "react";
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {GameInfoContext} from "../../Context/GameInfoContext.jsx";
import './CreateWishlist.css'

function CreateWishlist () {
    const { wishlist, setWishlist} = useContext(WishlistContext)
    const {gameInfo} = useContext(GameInfoContext)
    const [selectedWishlist, setSelectedWishlist] = useState('');
    const [newWishlistName, setNewWishlistName] = useState('');

    const handleAddToWishlist = () => {
        if (selectedWishlist && gameInfo) {
            const updatedWishlists = wishlist.map((wishlist) => {
                if (wishlist.name === selectedWishlist) {
                    return {
                        ...wishlist,
                        games: [...wishlist.games, gameInfo],
                    };
                }
                return wishlist;
            });

            setWishlist(updatedWishlists);
        }
    };


    const handleCreateWishlist = () => {
        if (newWishlistName.trim() !== '') {
            // Create a new wishlist with the entered name
            const newWishlist = {
                name: newWishlistName,
                games: [],
            };

            if (gameInfo) {
                newWishlist.games.push(gameInfo); // Add the game to the new wishlist if gameInfo is available
            }

            setWishlist([...wishlist, newWishlist]); // Update the wishlist state

            // Clear the input field
            setNewWishlistName('');
        }
    }

    return (
        <div className="button-container">
                <select value={selectedWishlist} onChange={(e) => setSelectedWishlist(e.target.value)}>
                    <option value="">Select Wishlist</option>
                    {wishlist.map((wishlist) => (
                        <option key={wishlist.name} value={wishlist.name}>{wishlist.name}</option>
                    ))}
                </select>
                <button onClick={handleAddToWishlist}>Add to Wishlist</button>
                <input
                    type="text"
                    value={newWishlistName}
                    onChange={(e) => setNewWishlistName(e.target.value)}
                    placeholder="Create a new wishlist"
                />
                <button onClick={handleCreateWishlist}>Create New Wishlist</button>

        </div>
    );
}

export default CreateWishlist