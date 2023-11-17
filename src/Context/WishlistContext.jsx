import {createContext, useEffect, useState} from "react";


export const WishlistContext = createContext();


const WishlistProvider = ({children}) => {
    const [wishlist,setWishlist] = useState([])

    const addToWishlist = () => {
        setWishlist([...wishlist])
    }

    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);

    // Update local storage whenever the wishlist changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);



    return (
    <WishlistContext.Provider value={{wishlist, setWishlist, addToWishlist}}>
        {children}
    </WishlistContext.Provider>
    )
}

export default WishlistProvider;