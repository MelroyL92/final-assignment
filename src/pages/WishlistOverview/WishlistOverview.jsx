import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import './WishlistOverview.css'
import {Link} from "react-router-dom";
import Input from "../../components/Forms/Input/Input.jsx";
import Button from "../../components/Forms/Button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import {WishlistContext} from "../../Context/WishlistContext.jsx";
import {useForm} from "react-hook-form";


function WishlistOverview () {

    const {wishlist} = useContext(WishlistContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [submitted, setSubmitted] = useState(false);


    const [filterSearch, setFilterSearch] = useState('');
    const [filteredWishlist, setFilteredWishlist] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

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

    const handleSearch = () => {

        setFilterSearch(filterSearch);
        setSelectedList(null);
    };

    // should store the data of the comments in local storage but doesn't work yet
    useEffect(() => {

        const storedData = localStorage.getItem('wishlist comment') // Hoe moet ik er nu voor zorgen dat het
        console.log(storedData)

    }, [])

    // creates a random id for the form to make it easier to store in local storage
    function createId() {
        return 'xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/x/g, function () {
            var r = Math.random() * 16 | 0;
            return r.toString(16);
        });
    }

    const id = createId()

    //function for actually storing the data
    function handleWishlistCommentSubmit(data) {
        console.log(data);

        localStorage.setItem( id , JSON.stringify(data))

        alert('Your comments have been saved');
    }

    return (

        <main className="parent-container">
                <nav className="nav-class">
                    <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home" />
                    <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                    <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                    <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About" />
                    <NavLinks to="/Login" iconSrc="src/assets/user-thin.svg" altText="login icon" text="Login" />
                    <NavLinks to="/Register" iconSrc="src/assets/alien-thin.svg" altText="register icon" text="Register" />
                </nav>
            <div className="page-wrapper">
                <div className="head-container">
                    <h1>Wishlist</h1>
                    <SearchBar source="src/assets/rawg-logo_750x430.jpg"
                               clickHandler={(event) => setFilterSearch(event.target.value)}
                               onSearch={handleSearch}
                    />
                </div>
                <section className="main-wrapper">
                    {filteredWishlist.map((titleList) => (
                        <div key={titleList.name} className="wishlist-overview-wrapper">
            <span className="image-wrapper-wishlist">
              <img
                  src="https://placehold.in/300x200@2x.png/dark"
                  alt="placeholder_image"
              />
            </span>
                            <span>
              <Link to={`/SpecificWishlist/${titleList.name}`}>
                <h2>{titleList.name}</h2>
              </Link>
            </span>
                            <ul>
                                {titleList.games.map((game) => (
                                    <li key={game.id}></li>
                                ))}
                                    {submitted ? (  // dit moet nog gecontroleerd worden, werkt nu nog niet goed.
                                        <div className="form-class">
                                            <h4>Subtitle:</h4>
                                            <p>subtitle</p>
                                            <h4>Comment:</h4>
                                            <p>comment</p>
                                        </div>
                                    ) : (
                                        <div className="parent-container">
                                            <form key={id} onSubmit={handleSubmit(handleWishlistCommentSubmit)}>
                                                <Input
                                                    inputType="text"
                                                    inputName="subtitle"
                                                    inputId="subtitle-field"
                                                    inputLabel="Subtitle"
                                                    validationRules={{
                                                        required: {
                                                            value: true,
                                                            message: "please fill in a subtitle",
                                                        }
                                                    }}
                                                    register={register}
                                                    errors={errors}
                                                />
                                                <Input
                                                    inputType="textarea"
                                                    inputName="comment"
                                                    inputId="comment-field"
                                                    inputLabel="Comment:"
                                                    validationRules={{
                                                        required: {
                                                            value: true,
                                                            message: "please fill in a description of the list",
                                                        }
                                                    }}
                                                    register={register}
                                                    errors={errors}
                                                />
                                                <Button type="submit" name="wishlist" label="Submit information"/>
                                            </form>
                                        </div>
                                    )}
                                </ul>
                        </div>
                    ))
                    }
                </section>
            </div>
        </main>
    )
}

export default WishlistOverview