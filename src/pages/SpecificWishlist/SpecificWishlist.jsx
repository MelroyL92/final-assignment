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
    const {wishlist} = useContext(WishlistContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [grade,setGrade] = useState(0)
    const [specificListSearch, setSpecificListSearch] = useState(null);
    const [filterSearch, setFilterSearch] = useState('');

    useEffect(() => {
        const foundList = wishlist.find(
            (list) => list.name.toLowerCase() === listName.toLowerCase()
        );
        setSpecificListSearch(foundList);
    }, [wishlist, listName]);

    const handleSearch = (searchTerm) => {
        setFilterSearch(searchTerm);
    };

    // Filter games based on the search term
    const filteredGames = specificListSearch
        ? specificListSearch.games.filter((game) =>
            game.name.toLowerCase().includes(filterSearch.toLowerCase())
        )
        : [];




    const handleSliderChange = (event, gameId) => {
        setGrade((prevGrade) => ({
            ...prevGrade,
            [gameId]: parseInt(event.target.value),
        }));
    };




    // should store the data of the comments in local storage but doesn't work yet
    useEffect(() => {

        const storedData = localStorage.getItem('wishlist comment') // Hoe moet ik er nu voor zorgen dat het
        console.log(storedData)

    }, [])

    // should store the data of the comments in local storage but doesn't work yet
    useEffect(() => {

        const storedData = localStorage.getItem('wishlist comment') // Hoe moet ik er nu voor zorgen dat het
        console.log(storedData)

    }, [])


    // Filter the specific list by name
    const specificList = wishlist.find((titleList) => titleList.name === listName);

    if (!specificList) {
        // Handle the case where the specific list is not found
        return <div>List not found</div>;
    }


    function handleSpecificWishlistSubmit(data) {
        console.log(data);
        localStorage.setItem(specificList.name , JSON.stringify(data))

        alert('Your comments have been saved');
        // You can call handleSearch or any other function with the form data here
    }


    return (
        <main className="parent-container">
            <nav className="nav-class">
            <NavLinks to="/" iconSrc="../src/assets/house-line-thin.svg" altText="home icon" text="Home" />
            <NavLinks to="/WishlistOverview" iconSrc="../src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
            <NavLinks to="/SearchResultPage" iconSrc="../src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
            <NavLinks to="/About" iconSrc="../src/assets/info-thin.svg" altText="about icon" text="About" />
            <NavLinks to="/Login" iconSrc="../src/assets/user-thin.svg" altText="login icon" text="Login" />
            <NavLinks to="/Register" iconSrc="../src/assets/alien-thin.svg" altText="register icon" text="Register" />
        </nav>
            <div className="page-wrapper">
                <div className="head-container">
                    <h1>{specificList.name}</h1>
                    <SearchBar source="../src/assets/rawg-logo_750x430.jpg"
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
                            <form onSubmit={handleSubmit( () => handleSpecificWishlistSubmit(game.id, grade[game.id]))}>
                                <Input
                                inputName="comment"
                                inputId="comment-field"
                                inputLabel="Comments"
                                inputType="textarea"
                                validationRules={{
                                    required: false,
                                }}
                                register={register}
                                errors={errors}
                                />
                                <Grade id={game.id} type="range" maxRange="10" minRange="0" changeHandler={(event) => handleSliderChange(event, game.id)} grade={grade[game.id] || 0}/>
                                <Button type="submit" label="Grade"/>
                            </form>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default  SpecificWishlist