import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import './WishlistOverview.css'
import {Link} from "react-router-dom";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../Context/AuthContext.jsx";
import WishlistOverviewPicture from "../../components/WishlistOverviewPicture/WishlistOverviewPicture.jsx";
import TextArea from "../../components/TextArea/TextArea.jsx";
import abortController from "../../helpers/AbortController.js";


function WishlistOverview() {
    const { wishlist } = useContext(WishlistContext);
    const { control, register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [filterSearch, setFilterSearch] = useState('');
    const [filteredWishlist, setFilteredWishlist] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const [comments, setComments] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedListName, setEditedListName] = useState(null);
    const textAreaRef = useRef();


    abortController();

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
            <nav className="color-style">
                <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home" />
                <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About" />
                {isAuthenticated ? (
                    <>
                        <NavLinks to="/ProfilePage" iconSrc="src/assets/user-thin.svg" altText="login icon" text="profile" />
                        <Button className="nav-button color-style min-width-1025px-links" type="button" clickHandler={logout} name="Logout"
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
                            <div className="wishlist-image-wrapper">
                                <WishlistOverviewPicture wishlistName={titleList.name}/>
                            </div>
                            <div className="wishlist-middle-wrapper">
                                <Link className="wishlistLink" to={`/SpecificWishlist/${titleList.name}`}>
                                    <h3>{titleList.name}</h3>
                                </Link>
                                <p>Total Games: {titleList.games.length}</p>
                            </div>
                            <ul>
                                {titleList.games.map((game) => (
                                    <li key={game.id}></li>
                                ))}
                            </ul>
                            <div>
                                <div className="wishlist-container">
                                    {comments && comments[`subtitle-${titleList.name}`] && comments[`comment-${titleList.name}`] ? (
                                        <div className="parent-container-form-wishlist" >
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
                                                    <TextArea
                                                        inputName={`comment-${titleList.name}`}
                                                        inputId={`comment-field-${titleList.name}`}
                                                        inputType="textarea"
                                                        validationRules={{
                                                            required: {
                                                                value: false,
                                                            }
                                                        }}
                                                        register={register}
                                                        errors={errors}
                                                        control={control}
                                                        rows={1}
                                                        cols={25}
                                                        ref={textAreaRef}
                                                    />
                                                    <Button type="submit" label="Save" clickHandler={() => handleWishlistCommentSubmit(getValues(), titleList.name)} className="button-wishlist-overview color-style border-radius" />
                                                    <Button type="button" label="Edit" clickHandler={() => handleCancelEdit()} className="button-wishlist-overview color-style border-radius" />
                                                </>
                                            ) : (
                                                <>
                                                    <h4>Subtitle:</h4>
                                                    <p>{comments[`subtitle-${titleList.name}`]}</p>
                                                    <h4>Comment:</h4>
                                                    <p>{comments[`comment-${titleList.name}`]}</p>
                                                    <Button type="button" label="Edit" clickHandler={() => handleEditButtonClick(titleList.name)} className="button-wishlist-overview color-style border-radius" />
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <form key={titleList.name} onSubmit={handleSubmit((data) => handleWishlistCommentSubmit(data, titleList.name))}>
                                                <p>Subtitle</p>
                                                <Input
                                                    inputType="text"
                                                    inputName={`subtitle-${titleList.name}`}
                                                    inputId={`subtitle-field-${titleList.name}`}

                                                    validationRules={{
                                                        required: {
                                                            value: false,
                                                            message: "please fill in a subtitle",
                                                        },
                                                    }}
                                                    register={register}
                                                    errors={errors}
                                                />
                                                <p>Comment:</p>
                                                <TextArea
                                                    inputName={`comment-${titleList.name}`}
                                                    inputId={`comment-field-${titleList.name}`}
                                                    inputType="textarea"
                                                    validationRules={{
                                                        required: {
                                                            value: false,
                                                        },
                                                            maxLength:40,
                                                            message: "exceeded the maximum amount of 40 characters"
                                                    }}
                                                    register={register}
                                                    errors={errors}
                                                    control={control}
                                                    rows={2}
                                                    cols={25}
                                                    ref={textAreaRef}
                                                />
                                                <Button type="submit" name={`wishlist-${titleList.name}`} label="Submit information" className="color-style border-radius"/>
                                                {}
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}

export default WishlistOverview;