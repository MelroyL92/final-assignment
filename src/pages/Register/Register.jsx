import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import axios from "axios";
import {useState} from "react";
import Input from "../../components/Forms/Input/Input.jsx";
import {useForm} from "react-hook-form";
import Button from "../../components/Forms/Button/Button.jsx";
import './Register.css'



function Register () {
    const [error, toggleError] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();
    async function handleRegisterSubmit (data){
        // hier een post request maken met daarbij de variabele die terugkomt van de form. door middel van de handleSubmit.
        console.log(data)

        try {           // api nog controleren of dit klopt!
            const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signup`,{
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "role": ['user', 'admin'],
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log(response)
            alert("you have now signed up!")

        } catch (e) {
            toggleError(true)
        }
    }
            // misschien een veld aanmaken voor (if name === admion, rol is admin and user ofzoiets)
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
                <div className="img-searchbar-container">
                    <div className="image">
                        <img className="homepage-image" src="src/assets/43916.jpg" alt="gaming-keyboard"/>
                    </div>
                    <form className="form-class" onSubmit={handleSubmit(handleRegisterSubmit)}>
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
                            inputName="email"
                            inputLabel="Email"
                            inputType="email"
                            inputId="register-field"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Email is required, must include a @"
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
                        <Button type="submit" label="Register"/>
                    </form>
                </div>

                {/*// input maken voor zowel email als wachtwoord, deze opslaan in een variabele en deze meegeven aan de post request*/}
            </main>
        )
}
export default Register