import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import '../../components/Navlinks/Navlinks.css'
import './Homepage.css'
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import {useContext} from "react";
import {SearchBarContext} from "../../Context/SearchBarContext.jsx";
import Input from "../../components/Forms/Input/Input.jsx";
import Button from "../../components/Forms/Button/Button.jsx";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../Context/AuthContext.jsx";


function Homepage () {
    const {handleSearch,searchTerm,handleChange} = useContext(SearchBarContext);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const {isAuthenticated, logout} = useContext(AuthContext)


    function handleFormSubmit  (data) {
        console.log(data);
        alert('Thank you for the feedback, I really appreciate it!');
        localStorage.setItem('feedback', JSON.stringify(data))
        reset()

    }

    return (
        <main className="parent-container">
            <nav className="nav-class">
                <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home"  />
                <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About" />
                {isAuthenticated ? (
                    <>
                        <NavLinks to="/ProfilePage" iconSrc="src/assets/user-thin.svg" altText="login icon" text="profile" />
                        <Button className="nav-button" type="button" clickHandler={logout} name="Logout" label="Logout" iconSrc="src/assets/sign-out-thin.svg" altText="sign-out"/>
                    </>
                ) : (
                    <>
                        <NavLinks to="/Login" iconSrc="src/assets/user-thin.svg" altText="login icon" text="Login" />
                        <NavLinks to="/Register" iconSrc="src/assets/alien-thin.svg" altText="register icon" text="Register" />
                    </>
                )}
            </nav>
            <div>
                <section className= "section-container">
                    <div className="img-searchbar-container">
                        <div className="image">
                            <img className="image-main" src="src/assets/32077.jpg" alt="gaming-keyboard"/>
                        </div>
                        <SearchBar onSearch={handleSearch} clickHandler={handleChange} searchValue={searchTerm} iconSrc="src/assets/magnifying-glass-thin.svg"  source="src/assets/rawg-logo_750x430.jpg"
                        />
                    </div>
                </section>
                <footer className="footer-container">
                    <div className="form-class">
                        <h3>Leave your feedback here!</h3>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="color-style form-home">
                        <Input
                            inputType="text"
                            inputName="name"
                            inputId="name-field"
                            inputLabel="Name"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "name is required"
                                }
                            }}
                            register={register}
                            errors={errors}
                        />
                        </div>
                        <div className="color-style form-home">
                        <Input
                            inputType="email"
                            inputName="email"
                            inputId="email-field"
                            inputLabel="Email"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "email is required",
                                }
                            }}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="color-style form-home" >
                        <Input
                            inputType="textarea"
                            inputName="comment"
                            inputId="comment-field"
                            inputLabel="Comment"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "comment is required",
                                }
                            }}
                            register={register}
                            errors={errors}
                        />
                        </div>
                        <Button type="submit" name="feedback form" label="submit form"/>
                    </form>
                    </div>
                </footer>
            </div>
        </main>
    )
}

export default Homepage