import {Link} from "react-router-dom"
import './Navlinks.css'


function NavLinks (){

    return (
        <div className="nav-class">
        <nav>
                 <ul>
                    <li className="nav-list-item-logo">logo</li>
                    <li className="nav-list-item"><Link to="/">
                        <div className="list-class">
                        <img src="src/assets/house-line-thin.svg" alt="home icon"/>
                       Home</div>
                        </Link></li>
                    <li className="nav-list-item"><Link to="/WishlistOverview">
                        <div className="list-class">
                        <img src="src/assets/list-thin.svg" alt="wishlist icon"/>
                        wishlists</div>
                    </Link></li>
                    <li className="nav-list-item"><Link to="/SearchResultPage">
                        <div className="list-class">
                        <img src="src/assets/magnifying-glass-thin.svg" alt="magnifying glass icon"/>
                        Search</div></Link></li>
                    <li className="nav-list-item"><Link to="/About">
                        <div className="list-class">
                        <img src="src/assets/info-thin.svg" alt="about icon"/>
                        About</div></Link></li>
                    <li className="nav-list-item"><Link to="/Login">
                        <div className="list-class">
                        <img src="src/assets/user-thin.svg" alt="login icon"/>
                        Login</div></Link></li>
                    <li className="nav-list-item"><Link to="/Register">
                        <div className="list-class">
                        <img src="src/assets/alien-thin.svg" alt="register icon"/>
                        Register</div></Link></li>
                </ul>
        </nav>
        </div>
    )
}

export default NavLinks