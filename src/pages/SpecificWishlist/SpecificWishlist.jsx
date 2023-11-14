import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import {useContext, useEffect, useState} from "react";
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {Link, useParams} from "react-router-dom";
import './SpecificWishlist.css'
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Grade from "../../helpers/Grade/Grade.jsx";
import Button from "../../components/Forms/Button/Button.jsx";
import Input from "../../components/Forms/Input/Input.jsx";
import {useForm} from "react-hook-form";

function SpecificWishlist() {
    const { listName } = useParams();
    const { wishlist } = useContext(WishlistContext);
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const [grade, setGrade] = useState(0);
    const [filterSearch, setFilterSearch] = useState('');
    const [editMode, setEditMode] = useState({});
    const [commentsAndGrades, setCommentsAndGrades] = useState({}); // Define commentsAndGrades state


    //logic for the comments for the specific wishlist, similar to the overview
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
        // Your logic to handle form submission
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

        // Toggle off edit mode after submitting
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

    // filters the game based on grade or name
    const filteredGames = specificList.games.filter((game) =>
        game.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
        (commentsAndGrades[game.id]?.grade && commentsAndGrades[game.id]?.grade.toString() === filterSearch)
    );
    console.log(filteredGames)

    const handleSearch = (searchTerm) => {
        setFilterSearch(searchTerm);
    };



    return (
        <main className="parent-container">
            <nav className="nav-class">
                <NavLinks to="/" iconSrc="../src/assets/house-line-thin.svg" altText="home icon" text="Home"/>
                <NavLinks to="/WishlistOverview" iconSrc="../src/assets/list-thin.svg" altText="wishlist icon"
                          text="Wishlists"/>
                <NavLinks to="/SearchResultPage" iconSrc="../src/assets/magnifying-glass-thin.svg"
                          altText="magnifying glass icon" text="Search"/>
                <NavLinks to="/About" iconSrc="../src/assets/info-thin.svg" altText="about icon" text="About"/>
                <NavLinks to="/Login" iconSrc="../src/assets/user-thin.svg" altText="login icon" text="Login"/>
                <NavLinks to="/Register" iconSrc="../src/assets/alien-thin.svg" altText="register icon"
                          text="Register"/>
            </nav>
            <div className="page-wrapper">
                <div className="head-container">
                    <h1>{filteredGames.name}</h1>
                    <SearchBar
                        source="../src/assets/rawg-logo_750x430.jpg"
                        clickHandler={(event) => setFilterSearch(event.target.value)}
                        onSearch={handleSearch}
                    />
                </div>
                <ul>
                    {filteredGames.map((game) => (
                        <li key={game.id} className="wishlist-overview-wrapper">
                            <span>
                                <img src={game.background_image} alt="game-image" />
                            </span>
                            <div>
                                <Link to={`/GameDetail/${game.id}`}>{game.name}</Link>
                            </div>
                            {editMode[game.id] ? (
                                <form onSubmit={handleSubmit(() => handleSpecificWishlistSubmit(game.id))}>
                                    <Input
                                        inputName={`comment-${game.id}`}
                                        inputId={`comment-field-${game.id}`}
                                        inputLabel="Comments"
                                        inputType="textarea"
                                        defaultValue={commentsAndGrades[game.id]?.comment || ''}
                                        validationRules={{
                                            required: false,
                                        }}
                                        register={register}
                                        setValue={setValue}
                                        errors={errors}
                                    />
                                    <Grade
                                        id={game.id}
                                        type="range"
                                        maxRange="10"
                                        minRange="0"
                                        changeHandler={(event) => handleSliderChange(event, game.id)}
                                        grade={grade[game.id] || 0}
                                    />
                                    <Button type="submit" label="Store Data" />
                                </form>
                            ) : (
                                <>
                                    <div>Comments: {commentsAndGrades[game.id]?.comment || 'No comment'}</div>
                                    <div>Grade: {commentsAndGrades[game.id]?.grade || 'No grade'}</div>
                                </>
                            )}
                            <button onClick={() => handleEditToggle(game.id)}>
                                {editMode[game.id] ? 'Cancel' : 'Edit'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default SpecificWishlist;





