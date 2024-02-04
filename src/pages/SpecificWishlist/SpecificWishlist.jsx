import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {Link, useParams} from "react-router-dom";
import './SpecificWishlist.css'
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Grade from "../../components/Grade/Grade.jsx";
import Button from "../../components/Button/Button.jsx";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../Context/AuthContext.jsx";
import TextArea from "../../components/TextArea/TextArea.jsx";
import abortController from "../../helpers/AbortController.js";

function SpecificWishlist() {
    const { listName } = useParams();
    const { wishlist } = useContext(WishlistContext);
    const {isAuthenticated, logout} = useContext(AuthContext);
    const {control, register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [grade, setGrade] = useState(0);
    const [filterSearch, setFilterSearch] = useState('');
    const [editMode, setEditMode] = useState({});
    const [commentsAndGrades, setCommentsAndGrades] = useState({});
    const textAreaRef = useRef();


    abortController();


    const handleEditToggle = (gameId) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [gameId]: !prevEditMode[gameId],
        }));
    };

    const handleSliderChange = (event, gameId) => {
        setGrade((prevGrade) => ({
            ...prevGrade,
            [gameId]: parseInt(event.target.value),
        }));
    };

    const handleSpecificWishlistSubmit = (gameId) => {

        const updatedCommentsAndGrades = {
            ...commentsAndGrades,
            [gameId]: {
                comment: getValues(`comment-${gameId}`),
                grade: grade[gameId] || 0,
            },
        };
        setCommentsAndGrades(updatedCommentsAndGrades);
        localStorage.setItem(`wishlist-comment-${listName}`, JSON.stringify(updatedCommentsAndGrades));
        alert('Your comments have been saved');

        handleEditToggle(gameId);
    };

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(`wishlist-comment-${listName}`)) || {};
        setCommentsAndGrades(storedData);
    }, [listName]);

    const specificList = wishlist.find(
        (list) => list.name.toLowerCase() === listName.toLowerCase()
    );

    if (!specificList) {
        return <div>List not found</div>;
    }


    const filteredGames = specificList.games.filter((game) =>
        game.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
        (commentsAndGrades[game.id]?.grade && commentsAndGrades[game.id]?.grade.toString() === filterSearch)
    );





    return (
        <main className="parent-container">
            <nav className="color-style">
                <NavLinks to="/" iconSrc="../src/assets/house-line-thin.svg" altText="home icon" text="Home"/>
                <NavLinks to="/WishlistOverview" iconSrc="../src/assets/list-thin.svg" altText="wishlist icon"
                          text="Wishlists"/>
                <NavLinks to="/SearchResultPage" iconSrc="../src/assets/magnifying-glass-thin.svg"
                          altText="magnifying glass icon" text="Search"/>
                <NavLinks to="/About" iconSrc="../src/assets/info-thin.svg" altText="about icon" text="About"/>
                {isAuthenticated ? (
                    <>
                        <NavLinks to="/ProfilePage" iconSrc="../src/assets/user-thin.svg" altText="login icon" text="profile" />
                        <Button className="nav-button color-style min-width-1025px-links" type="button" clickHandler={logout} name="Logout" label="Logout" iconSrc="../src/assets/sign-out-thin.svg" altText="sign-out"/>
                    </>
                ) : (
                    <>
                        <NavLinks to="/Login" iconSrc="../src/assets/user-thin.svg" altText="login icon" text="Login" />
                        <NavLinks to="/Register" iconSrc="../src/assets/alien-thin.svg" altText="register icon" text="Register" />
                    </>
                )}
            </nav>


            <div className="page-wrapper">
                <div className="head-container">
                    <h1>{specificList.name}</h1>
                    <SearchBar
                        source="../src/assets/rawg-logo_750x430.jpg"
                        iconSrc="../src/assets/magnifying-glass-thin.svg"
                        clickHandler={(event) => setFilterSearch(event.target.value)}
                    />
                </div>
                <div className="overflow-class">
                <ul className="overflow-class">
                    {filteredGames.map((game) => (
                        <li key={game.id} className="wishlist-overview-wrapper color-style">
                            <div className="wishlist-image-wrapper">
                                <img src={game.background_image} alt="game-image" />
                            </div>
                            <div className="wishlist-middle-wrapper">
                               <h3><Link to={`/GameDetail/${game.id}`} className="link-style">{game.name}</Link></h3>
                            </div>
                            <div className="parent-container-form-wishlist">
                            {editMode[game.id] ? (
                                <form onSubmit={handleSubmit(() => handleSpecificWishlistSubmit(game.id))}>
                                   <div>
                                    <p>Comments:</p>
                                    <TextArea
                                        inputName={`comment-${game.id}`}
                                        inputId={`comment-field-${game.id}`}
                                        defaultValue={commentsAndGrades[game.id]?.comment || ''}
                                        inputType="textarea"
                                        validationRules={{
                                            required: {
                                                value: false,
                                            }
                                        }}
                                        register={register}
                                        errors={errors}
                                        control={control}
                                        rows={2}
                                        cols={25}
                                        ref={textAreaRef}
                                    />
                                   </div>
                                    <div>
                                    <Grade
                                        id={game.id}
                                        type="range"
                                        maxRange="10"
                                        minRange="0"
                                        changeHandler={(event) => handleSliderChange(event, game.id)}
                                        grade={grade[game.id] || 0}
                                    />
                                </div>
                                    <Button type="submit" label="Store Data" className="color-style border-radius" />
                                </form>
                            ) : (
                                <>
                                    <div className="media-wishlist">Comments: {commentsAndGrades[game.id]?.comment || 'No comment'}</div>
                                    <div className="media-wishlist">Grade: {commentsAndGrades[game.id]?.grade || 'No grade'}</div>
                                </>
                            )}
                            </div>
                            <Button className="button-wishlist-specific color-style border-radius" clickHandler={() => handleEditToggle(game.id)} label="Edit"/>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </main>
    );
}

export default SpecificWishlist;





