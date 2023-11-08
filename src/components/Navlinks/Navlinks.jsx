import {Link} from "react-router-dom"
import './Navlinks.css'


function NavLinks (){

    return (
        <div className="nav-class">
        <nav>
                 <ul className="nav-list-item">
                   <div className="list-class"><li>logo</li></div>
                     <li><Link to="/">
                        <div className="list-class">
                        <span className="icon-wrapper"><img src="src/assets/house-line-thin.svg" alt="home icon"/></span>
                       Home</div>
                        </Link></li>
                    <li><Link to="/WishlistOverview">
                        <div className="list-class">
                         <span className="icon-wrapper"><img src="src/assets/list-thin.svg" alt="wishlist icon"/></span>
                        wishlists</div>
                    </Link></li>
                    <li><Link to="/SearchResultPage">
                        <div className="list-class">
                         <span className="icon-wrapper"><img src="src/assets/magnifying-glass-thin.svg" alt="magnifying glass icon"/></span>
                        Search</div></Link></li>
                    <li><Link to="/About">
                        <div className="list-class">
                         <span className="icon-wrapper"><img src="src/assets/info-thin.svg" alt="about icon"/></span>
                        About</div></Link></li>
                    <li><Link to="/Login">
                        <div className="list-class">
                         <span className="icon-wrapper"><img src="src/assets/user-thin.svg" alt="login icon"/></span>
                        Login</div></Link></li>
                    <li><Link to="/Register">
                        <div className="list-class">
                         <span className="icon-wrapper"><img src="src/assets/alien-thin.svg" alt="register icon"/></span>
                        Register</div></Link></li>
                </ul>
        </nav>
        </div>
    )
}

export default NavLinks