import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import axios from "axios";
import {useState} from "react";
import Input from "../../components/Input/Input.jsx";
import {useForm} from "react-hook-form";
import Button from "../../components/Button/Button.jsx";
import './Register.css'
import Loader from "../../helpers/Loader/Loader.jsx";



function Register () {
    const [error, toggleError] = useState(false);
    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false)

    async function handleRegisterSubmit (data){
        setLoading(true);

        try {
            const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signup`,{
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "role": ["user", "admin"],
                headers: {
                    "Content-Type": "application/json",
                }
            });
            alert("you have now signed up!")

        } catch (e) {
            console.error(e.response)
            setErrorMessage(e.response.data.message)
            toggleError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="parent-container">
            <nav className="nav-class color-style">
                <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home"  />
                <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About" />
                <NavLinks to="/Login" iconSrc="src/assets/user-thin.svg" altText="login icon" text="Login"/>
                <NavLinks to="/Register" iconSrc="src/assets/alien-thin.svg" altText="register icon" text="Register"/>
            </nav>
            <div className="img-searchbar-container-homepage">
                <div className="image">
                    <img className="image-polygon" src="src/assets/43916.jpg" alt="register"/>
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
                            <div className="password-icon-register" onClick={()=> (setVisible(!visible))}>
                                {visible ? <img src="src/assets/eye-thin.svg" alt="visible"/> : <img src="src/assets/eye-closed-thin.svg" alt="invisible"/> }
                            </div>
                        </span>
                            <div>{error && <p>Please make sure the information you are using is correct!</p>}</div>
                            <div>{errorMessage && errorMessage.length > 0 && <p>{errorMessage}</p>}</div>
                            {loading && <div className="loader"><Loader/></div>}
                            <Button type="submit" label="Register" className="form-button color-style"/>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Register