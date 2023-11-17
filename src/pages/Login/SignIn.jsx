import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../Context/AuthContext.jsx";
import Input from "../../components/Forms/Input/Input.jsx";
import Button from "../../components/Forms/Button/Button.jsx";
import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import {useForm} from "react-hook-form";
import "./SignIn.css"

function SignIn () {
    const {login} = useContext(AuthContext)
    const [error, toggleError] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [visible, setVisible] = useState(false)

    async function handleFormSubmit(data) {

        try {
            const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signin`, {
                username: data.username,
                password: data.password,
            });
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
            <section className="img-searchbar-container">
                <div className="image">
                    <img className="image-main" src="src/assets/26239.jpg" alt="gaming-keyboard"/>
                </div>
                <div className="form-wrapper login-wrapper">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="form-field color-style">
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
                </div>
                    <div className="form-field color-style" >
                    <Input
                        inputName="password"
                        inputLabel="Password"
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
                </div>
                    <div className="password-icon-login" onClick={()=> (setVisible(!visible))}>
                        {visible ? <img src="src/assets/eye-thin.svg" alt="visible"/> : <img src="src/assets/eye-closed-thin.svg" alt="invisible"/> }
                    </div>
                    <Button type="submit" label="Login"/>
                </form>
                </div>
            </section>
        </main>
    )
}

export default SignIn