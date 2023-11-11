import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import '../../components/Navlinks/Navlinks.css'
import './Homepage.css'
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import {useContext, useState} from "react";
import {SearchBarContext} from "../../Context/SearchBarContext.jsx";
import Input from "../../components/Forms/Input/Input.jsx";
import Button from "../../components/Forms/Button/Button.jsx";
import {useForm} from "react-hook-form";


function Homepage () {
    const {handleSearch} = useContext(SearchBarContext);
    const {register, handleSubmit, formState: {errors}} = useForm();



        function handleFormSubmit  (data) {
        console.log(data);
        alert('Thank you for the feedback, I really appreciate it!');
        // You can call handleSearch or any other function with the form data here
    }

    return (
        <main className="parent-container">
              <nav className="nav-class">
                  <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home"  />
                  <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                  <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                  <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About" />
                  <NavLinks to="/Login" iconSrc="src/assets/user-thin.svg" altText="login icon" text="Login" />
                  <NavLinks to="/Register" iconSrc="src/assets/alien-thin.svg" altText="register icon" text="Register" />
             </nav>
            <div className="homepage-container">
            <section className= "section-container">
                <div className="img-searchbar-container">
                    <div className="image">
                        <img className="homepage-image" src="src/assets/32077.jpg" alt="gaming-keyboard"/>
                    </div>
                    <SearchBar onSearch={handleSearch} source="src/assets/rawg-logo_750x430.jpg"/>
                </div>
            </section>
            <footer className="footer-container">
                <form className="form-class" onSubmit={handleSubmit(handleFormSubmit)}>
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
                    <Button type="submit" name="feedback form" label="submit form"/>
                </form>
            </footer>
            </div>



        </main>
    )
}

export default Homepage