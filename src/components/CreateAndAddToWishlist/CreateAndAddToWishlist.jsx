import {useContext, useState} from "react";
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {GameInfoContext} from "../../Context/GameInfoContext.jsx";
import './CreateAndAddToWishlist.css'
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import {useForm} from "react-hook-form";

function CreateAndAddToWishlist () {
    const { wishlist, setWishlist} = useContext(WishlistContext)
    const {gameInfo} = useContext(GameInfoContext)
    const [selectedWishlist, setSelectedWishlist] = useState('');
    const [newWishlistName, setNewWishlistName] = useState('');
    const [notification, setNotification] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm();

    const handleAddToWishlist = () => {
        if (selectedWishlist && gameInfo) {

            const isGameAlreadyInWishlist = wishlist
                .find(wishlist => wishlist.name === selectedWishlist)
                ?.games.some(game => game.name === gameInfo.name);

            if (isGameAlreadyInWishlist) {
                setNotification(`The game ${gameInfo.name} is already in ${selectedWishlist}.`);
            } else {
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
            }

        }else {
            setNotification('Please select a wishlist before adding the game.');
        }
    };


    const handleCreateWishlist = (data) => {
        if (data.newWishlistName.trim() !== '') {

            const isDuplicateWishlistName = wishlist.some(wishlist =>
                wishlist.name === data.newWishlistName);
            const isGameAlreadyInWishlist = wishlist.some(wishlist =>
                wishlist.games.some(game => game.name === gameInfo.name)
            );

            if (isDuplicateWishlistName) {
                setNotification(`A wishlist with the name "${newWishlistName}" already exists. Please choose a different name.`)
            } else if (isGameAlreadyInWishlist) {
                setNotification(`The game ${gameInfo.name} is already in a wishlist.`);
            } else {
                const newWishlist = {
                    name: data.newWishlistName,
                    games: gameInfo ? [gameInfo] : [],
                };

                setWishlist(prevWishlist => [...prevWishlist, newWishlist]);

                setNewWishlistName('');
                setNotification(`A new list has been created, and ${gameInfo.name} has been added to the list.`);
            }
        } else {
            setNotification('Please enter a name for the new wishlist.');
        }
    };

    return (
        <div>
            <div>
                {notification && <div className="notification">{notification}</div>}
            </div>
        <div className="button-container">
            <select value={selectedWishlist} onChange={(e) => setSelectedWishlist(e.target.value)}>
                    <option value="">Select Wishlist</option>
                    {wishlist.map((wishlist) => (
                        <option key={wishlist.name} value={wishlist.name}>{wishlist.name}</option>
                    ))}
                </select>
            <Button type="button" clickHandler={handleAddToWishlist} label="Add to wishlist" className="color-style border-radius"/>
           <form onSubmit={handleSubmit(handleCreateWishlist)}>
               <div className="div-detail">
               <Input
                   className="form-detail"
                   inputType="text"
                   inputName="newWishlistName"
                   inputId="newWishlistName"
                   validationRules={{
                       required: {
                           value: true,
                           message: "please fill in a valid name",
                       }
                   }}
                   register={register}
                   errors={errors}
               />
               <Button type="submit"  label="Create new wishlist" className="color-style border-radius"/>
               </div>
           </form>
        </div>
        </div>
    );
}

export default CreateAndAddToWishlist