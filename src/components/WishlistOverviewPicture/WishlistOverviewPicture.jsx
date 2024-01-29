import {useEffect, useState} from "react";

 function WishlistOverviewPicture ({ wishlistName }) {
    const [wishlist,setWishlist] = useState([])
    const [firstGame, setFirstGame] = useState({})

        useEffect( ()=> {
            async function retrieveImage() {

                try {
                    const storedItems = JSON.parse(localStorage.getItem('wishlist'))
                    setWishlist(storedItems);
                } catch (error) {
                    console.error('Error accessing localStorage:', error);
                }
            }
            void retrieveImage()
    },[])


     useEffect(() => {
         const renderImageForWishlist = () => {
             const selectedWishlist = wishlist.find((list) => list.name === wishlistName);

             if (selectedWishlist && selectedWishlist.games.length > 0) {
                 setFirstGame(selectedWishlist.games[0]);
             } else {
                 setFirstGame([]);
             }
         };

         renderImageForWishlist();
     }, [wishlistName, wishlist]);


    return (
        <div>
        {firstGame && firstGame.background_image ? (
            <img
                src={firstGame.background_image}
                alt={`Background image of ${wishlistName}`}
            />
        ) : (
            <p>No game found in {wishlistName}</p>
        )}
        </div>
    )
}

export default WishlistOverviewPicture

