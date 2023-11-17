import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import axios from "axios";
import {useContext, useState} from "react";
import Input from "../../components/Forms/Input/Input.jsx";
import {useForm} from "react-hook-form";
import Button from "../../components/Forms/Button/Button.jsx";
import './Register.css'
import {AuthContext} from "../../Context/AuthContext.jsx";



function Register () {
    const [error, toggleError] = useState(false);
    const [visible, setVisible] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {isAuthenticated, logout} = useContext(AuthContext)

    async function handleRegisterSubmit (data){

        try {
            const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signup`,{
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "role": ["user", "admin"], // user/Admin nog uitzoeken voor het inleveren!
                headers: {
                    "Content-Type": "application/json",
                }
            });
            alert("you have now signed up!")

        } catch (e) {
            toggleError(true)
        }
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
                <div className="img-searchbar-container">
                    <div className="image">
                        <img className="image-main" src="src/assets/43916.jpg" alt="register"/>
                    </div>
                    <div>
                    <div className="form-wrapper register-wrapper">
                    <form  onSubmit={handleSubmit(handleRegisterSubmit)}>
                        <div className="form-field color-style">
                            <p>Username</p>
                        <Input
                            inputName="username"
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
                        </div>
                        <div className="form-field color-style">
                            <p>Email</p>
                        <Input
                            inputName="email"
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
                        </div>
                        <span className="form-field color-style">
                            <p>Password</p>
                        <Input
                            inputName="password"
                            inputType={visible ? "text" : "password"}
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
                            <div className="password-icon" onClick={()=> (setVisible(!visible))}>
                                {visible ? <img src="src/assets/eye-thin.svg" alt="visible"/> : <img src="src/assets/eye-closed-thin.svg" alt="invisible"/> }
                            </div>
                        </span>
                        <Button type="submit" label="Register" className=""/>
                    </form>
                    </div>
                    </div>
                </div>

                {/*// input maken voor zowel email als wachtwoord, deze opslaan in een variabele en deze meegeven aan de post request*/}
            </main>
        )
}
export default Register