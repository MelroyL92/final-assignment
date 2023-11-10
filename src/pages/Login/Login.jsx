import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../Context/AuthContext.jsx";
import Input from "../../components/Forms/Input/Input.jsx";
import Button from "../../components/Forms/Button/Button.jsx";
import NavLinks from "../../components/Navlinks/Navlinks.jsx";


function Login () {
    const {login} = useContext(AuthContext)
    const [error, toggleError] = useState(false);



    async function handleSubmit (e){
        e.preventDefault()

        try {           // api nog controleren of dit klopt!
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/auth/signin`,{
                username : "in te vullen", // hier zal een variabele voor gebruikt moeten worden!
                password : 'in te vullen', // ook hier zal een variabele voor gebruikt moeten worden!
            });
            console.log(response)
        } catch (e) {
            toggleError(true)
        }
        Login(response.data.accesToken) // relevante pad gebruiken vanuit de api
    }



    return(
        <main className="parent-container">
            <nav className="nav-class">
                <NavLinks to="/" iconSrc="src/assets/house-line-thin.svg" altText="home icon" text="Home"  />
                <NavLinks to="/WishlistOverview" iconSrc="src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                <NavLinks to="/SearchResultPage" iconSrc="src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                <NavLinks to="/About" iconSrc="src/assets/info-thin.svg" altText="about icon" text="About" />
                <NavLinks to="/Login" iconSrc="src/assets/user-thin.svg" altText="login icon" text="Login" />
                <NavLinks to="/Register" iconSrc="src/assets/alien-thin.svg" altText="register icon" text="Register" />
            </nav>
        <form onSubmit={handleSubmit}>
            <Button type="submit" label="Login"/>
        </form>
        </main>
    )
}

export default Login