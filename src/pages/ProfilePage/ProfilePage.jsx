import {useContext, useState} from "react";
import {AuthContext} from "../../Context/AuthContext.jsx";
import {Link} from "react-router-dom";
import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import Button from "../../components/Forms/Button/Button.jsx";
import './ProfilePage.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit.jsx";
import ImageEdit from "../../components/ProfileEdit/ImageEdit.jsx";


function ProfilePage () {
    const { isAuthenticated, user, logout} = useContext(AuthContext);
    const [error, toggleError] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();


    return(
        <main className="parent-container">
            <nav className="nav-class">
                <NavLinks to="/" iconSrc="../src/assets/house-line-thin.svg" altText="home icon" text="Home" />
                <NavLinks to="/WishlistOverview" iconSrc="../src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                <NavLinks to="/SearchResultPage" iconSrc="../src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                <NavLinks to="/About" iconSrc="../src/assets/info-thin.svg" altText="about icon" text="About" />
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
            <section>
                <div className="img-searchbar-container">
                    <div className="image">
                        <img className="image-main" src="src/assets/27893.jpg" alt="gaming-keyboard"/>
                    </div>
                    <h1>Profile page</h1>
                    <h2> welcome {user.username}!</h2>
                    <div className="text-class profile-class">
                        <div className="user-image-wrapper">
                            <ImageEdit/>
                            {user && <img className="image-profile" src={user.profilePicture} alt="profile pic"/>}
                        </div>
                        <div className="user-information">
                            <div>
                                <span className="info-field color-style"><h3>userInformation</h3></span>
                                <span className="info-field color-style"><p>Username : {user.username}</p></span>
                                <span className="info-field color-style"> <p>Emailadres :  {user.email}</p></span>
                            </div>
                        </div>
                        <div className="profile-edit-section">
                        <ProfileEdit/>
                        </div>
                    </div>

                </div>

            </section>

        </main>
    )

}

export default ProfilePage