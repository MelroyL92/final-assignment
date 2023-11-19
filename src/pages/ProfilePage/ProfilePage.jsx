import {useContext} from "react";
import {AuthContext} from "../../Context/AuthContext.jsx";
import NavLinks from "../../components/Navlinks/Navlinks.jsx";
import Button from "../../components/Button/Button.jsx";
import './ProfilePage.css'
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit.jsx";
import ImageEditProfile from "../../components/imageEditProfile/ImageEditProfile.jsx";


function ProfilePage () {
    const { isAuthenticated, user, logout} = useContext(AuthContext);

    return(
        <main className="parent-container">
            <nav className="nav-class color-style">
                <NavLinks to="/" iconSrc="../src/assets/house-line-thin.svg" altText="home icon" text="Home" />
                <NavLinks to="/WishlistOverview" iconSrc="../src/assets/list-thin.svg" altText="wishlist icon" text="Wishlists" />
                <NavLinks to="/SearchResultPage" iconSrc="../src/assets/magnifying-glass-thin.svg" altText="magnifying glass icon" text="Search" />
                <NavLinks to="/About" iconSrc="../src/assets/info-thin.svg" altText="about icon" text="About" />
                {isAuthenticated ? (
                    <>
                        <NavLinks to="/ProfilePage" iconSrc="src/assets/user-thin.svg" altText="login icon" text="profile" />
                        <Button className="nav-button color-style min-width-1025px-links" type="button" clickHandler={logout} name="Logout" label="Logout" iconSrc="src/assets/sign-out-thin.svg" altText="sign-out"/>
                    </>
                ) : (
                    <>
                        <NavLinks to="/Login" iconSrc="src/assets/user-thin.svg" altText="login icon" text="Login" />
                        <NavLinks to="/Register" iconSrc="src/assets/alien-thin.svg" altText="register icon" text="Register" />
                    </>
                )}
            </nav>
            <section>
                <div className="img-searchbar-container-homepage">
                    <div className="image">
                        <img className="image-polygon" src="src/assets/27893.jpg" alt="gaming-keyboard"/>
                    </div>
                    <h1>Profile page</h1>
                    <h2> welcome {user.username}!</h2>
                    <div className="profile-class">
                        <div className="user-image-wrapper">
                            <ImageEditProfile/>
                            {user && <img className="border-radius" src={user.profilePicture} alt="profile pic"/>}
                        </div>
                        <div className="user-information">
                            <div>
                                <span className="info-field color-style border-radius"><h3>userInformation</h3></span>
                                <span className="info-field color-style border-radius"><p>Username : {user.username}</p></span>
                                <span className="info-field color-style border-radius"> <p>Emailadres :  {user.email}</p></span>
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