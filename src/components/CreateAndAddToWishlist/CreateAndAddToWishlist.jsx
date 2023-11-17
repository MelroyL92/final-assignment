import {useContext, useState} from "react";
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {GameInfoContext} from "../../Context/GameInfoContext.jsx";
import './CreateAndAddToWishlist.css'
import Button from "../Forms/Button/Button.jsx";


function CreateAndAddToWishlist () {
    const { wishlist, setWishlist} = useContext(WishlistContext)
    const {gameInfo} = useContext(GameInfoContext)
    const [selectedWishlist, setSelectedWishlist] = useState('');
    const [newWishlistName, setNewWishlistName] = useState('');
    const [notification, setNotification] = useState('');

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
            setNotification(`${gameInfo.name} has been added to ${selectedWishlist}`);
        } else {
            setNotification('Please select a wishlist before adding the game.');
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

            setNewWishlistName('');
            setNotification(`A new list has been created, and ${gameInfo.name} has been added to the list.`);
        } else {
            setNotification('Please enter a name for the new wishlist.');
        }
    };


    return (
        <div>
        <div className="button-container">
            <select value={selectedWishlist} onChange={(e) => setSelectedWishlist(e.target.value)}>
                    <option value="">Select Wishlist</option>
                    {wishlist.map((wishlist) => (
                        <option key={wishlist.name} value={wishlist.name}>{wishlist.name}</option>
                    ))}
                </select>
            <button onClick={handleAddToWishlist}>Add to wishlist</button>
            <input
                    type="text"
                    value={newWishlistName}
                    onChange={(e) => setNewWishlistName(e.target.value)}
                    placeholder="Create a new wishlist"
                />
            <button onClick={handleCreateWishlist}>Create new wishlist</button>
        </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}

export default CreateAndAddToWishlist