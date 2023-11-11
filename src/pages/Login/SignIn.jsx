import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../Context/AuthContext.jsx";
import Input from "../../components/Forms/Input/Input.jsx";
import Button from "../../components/Forms/Button/Button.jsx";
import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import {useForm} from "react-hook-form";


function SignIn () {
    const {login} = useContext(AuthContext)
    const [error, toggleError] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleFormSubmit(data) {

        try {           // api nog controleren of dit klopt!
            const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signin`, {
                username: data.username, // hier zal een variabele voor gebruikt moeten worden!
                password: data.password, // ook hier zal een variabele voor gebruikt moeten worden!
            });
            console.log(response)
            login(response.data.accessToken)
        } catch (e) {
            toggleError(true)
        }
    }


    return (
        <main className="parent-container">
            <nav className="nav-class">
                <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home"/>
                <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon"
                          text="Wishlists"/>
                <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg"
                          altText="magnifying glass icon" text="Search"/>
                <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About"/>
                <NavLinks to="/Login" iconSrc="src/assets/user-thin.svg" altText="login icon" text="Login"/>
                <NavLinks to="/Register" iconSrc="src/assets/alien-thin.svg" altText="register icon" text="Register"/>
            </nav>
            <div className="img-searchbar-container">
                <div className="image">
                    <img className="homepage-image" src="src/assets/26239.jpg" alt="gaming-keyboard"/>
                </div>
                <form className="form-class" onSubmit={handleSubmit(handleFormSubmit)}>
                    <Input
                        inputName="username"
                        inputLabel="Username"
                        inputType="text"
                        inputId="username field"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Username is required"
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    <Input
                        inputName="password"
                        inputLabel="Password"
                        inputType="text"
                        inputId="Password-field"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Password must contain at least 6 letters "
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    <Button type="submit" label="Login"/>
                </form>
            </div>

            {/*// input maken voor zowel email als wachtwoord, deze opslaan in een variabele en deze meegeven aan de post request*/}
        </main>
    )
}

export default SignIn