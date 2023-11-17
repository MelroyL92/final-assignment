import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import './WishlistOverview.css'
import {Link} from "react-router-dom";
import Input from "../../components/Forms/Input/Input.jsx";
import Button from "../../components/Forms/Button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../Context/AuthContext.jsx";
import WishlistOverviewPicture from "../../components/WishlistOverviewPicture/WishlistOverviewPicture.jsx";


function WishlistOverview() {
    const { wishlist } = useContext(WishlistContext);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [filterSearch, setFilterSearch] = useState('');
    const [filteredWishlist, setFilteredWishlist] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const [comments, setComments] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedListName, setEditedListName] = useState(null);

    // makes the lists on the page accessible to the searchBar
    useEffect(() => {
        try {
            const filteredList = wishlist.map((titleList) => ({
                ...titleList,
                games: titleList.games.filter(
                    (game) =>
                        game.name.toLowerCase().includes(filterSearch.toLowerCase())
                ),
            })).filter((titleList) =>
                titleList.name.toLowerCase().includes(filterSearch.toLowerCase())
            );
            setFilteredWishlist(filteredList);
        } catch (e) {
            console.error(e);
        }
    }, [wishlist, filterSearch]);

    function handleSearch() {
        setFilterSearch(filterSearch);
        setSelectedList(null);
    }

    // made to handle the form-inputs and store it to local storage or retrieve it when needed.
    useEffect(() => {
        try {
            const storedComments = JSON.parse(localStorage.getItem(`comments-${selectedList}`)) || {};
            setComments(storedComments);
        } catch (e) {
            console.error(e);
        }
    }, [wishlist, filterSearch, selectedList]);

    const handleWishlistCommentSubmit = (data, listName) => {
        const updatedComments = {
            ...comments,
            [`subtitle-${listName}`]: data[`subtitle-${listName}`] || '',
            [`comment-${listName}`]: data[`comment-${listName}`] || '',
        };

        setComments(updatedComments);
        localStorage.setItem(`comments-${selectedList}`, JSON.stringify(updatedComments));
        alert('Your comments have been saved');
    };

    const handleEditButtonClick = (listName) => {
        setEditMode(true);
        setEditedListName(listName);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditedListName(null);
    };




    return (
        <main className="parent-container">
            <nav className="nav-class">
                <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home" />
                <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About" />
                {isAuthenticated ? (
                    <>
                        <NavLinks to="/ProfilePage" iconSrc="src/assets/user-thin.svg" altText="login icon" text="profile" />
                        <Button className="nav-button" type="button" clickHandler={logout} name="Logout"
                                label="Logout" iconSrc="src/assets/sign-out-thin.svg" altText="sign-out" />
                    </>
                ) : (
                    <>
                        <NavLinks to="/Login" iconSrc="src/assets/user-thin.svg" altText="login icon" text="Login" />
                        <NavLinks to="/Register" iconSrc="src/assets/alien-thin.svg" altText="register icon" text="Register" />
                    </>
                )}
            </nav>
            <div className="page-wrapper">
                <div className="head-container">
                    <h1>Wishlists</h1>
                    <SearchBar source="src/assets/rawg-logo_750x430.jpg"
                               iconSrc="src/assets/magnifying-glass-thin.svg"
                               clickHandler={(event) => setFilterSearch(event.target.value)}
                               onSearch={handleSearch}
                    />
                </div>
            <section className="result-class">
                {filteredWishlist.map((titleList) => (
                    <div key={titleList.name} className="wishlist-overview-wrapper">
                            <WishlistOverviewPicture wishlistName={titleList.name}/>
                            <div>
                            <Link to={`/SpecificWishlist/${titleList.name}`}>
                            <h2>{titleList.name}</h2>
                            </Link>
                            <p>Total Games: {titleList.games.length}</p>
                            </div>
                        <ul>
                            {titleList.games.map((game) => (
                                <li key={game.id}></li>
                            ))}
                        </ul>
                        {comments && comments[`subtitle-${titleList.name}`] && comments[`comment-${titleList.name}`] ? (
                            <div className="form-class">
                                {editMode && editedListName === titleList.name ? (
                                    <>
                                        <h4>Subtitle:</h4>
                                        <Input
                                            inputType="text"
                                            inputName={`subtitle-${titleList.name}`}
                                            inputId={`subtitle-field-${titleList.name}`}
                                            defaultValue={comments[`subtitle-${titleList.name}`]}
                                            register={register}
                                            errors={errors}
                                        />
                                        <h4>Comment:</h4>
                                        <Input
                                            inputType="textarea"
                                            inputName={`comment-${titleList.name}`}
                                            inputId={`comment-field-${titleList.name}`}
                                            defaultValue={comments[`comment-${titleList.name}`]}
                                            register={register}
                                            errors={errors}
                                        />
                                        <Button type="submit" label="Save Changes" clickHandler={() => handleWishlistCommentSubmit(getValues(), titleList.name)} />
                                        <Button type="button" label="Cancel" clickHandler={() => handleCancelEdit()} />
                                    </>
                                ) : (
                                    <>
                                        <h4>Subtitle:</h4>
                                        <p>{comments[`subtitle-${titleList.name}`]}</p>
                                        <h4>Comment:</h4>
                                        <p>{comments[`comment-${titleList.name}`]}</p>
                                        <Button type="button" label="Edit" clickHandler={() => handleEditButtonClick(titleList.name)} />
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="parent-container-form">
                                <form key={titleList.name} onSubmit={handleSubmit((data) => handleWishlistCommentSubmit(data, titleList.name))}>
                                    <Input
                                        inputType="text"
                                        inputName={`subtitle-${titleList.name}`}
                                        inputId={`subtitle-field-${titleList.name}`}
                                        inputLabel="Subtitle"
                                        validationRules={{
                                            required: {
                                                value: true,
                                                message: "please fill in a subtitle",
                                            },
                                        }}
                                        register={register}
                                        errors={errors}
                                    />
                                    <Input
                                        inputType="textarea"
                                        inputName={`comment-${titleList.name}`}
                                        inputId={`comment-field-${titleList.name}`}
                                        inputLabel="Comment:"
                                        validationRules={{
                                            required: {
                                                value: true,
                                                message: "please fill in a description of the list",
                                            },
                                        }}
                                        register={register}
                                        errors={errors}
                                    />
                                    <Button type="submit" name={`wishlist-${titleList.name}`} label="Submit information" />
                                </form>
                            </div>
                        )}
                    </div>
                ))}
            </section>
            </div>
        </main>



    );
}

export default WishlistOverview;