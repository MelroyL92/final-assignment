import {Link} from "react-router-dom"
import './Navlinks.css'


function NavLinks ({ to, iconSrc, altText, text }){

    return (
        <div>
            <ul className="nav-class">
                <li className="min-width-1025px-links ">
                    <Link to={to} className="link-style">
                        <div className="list-class">
                            {text}
                            <span className="icon-wrapper">
                                <img src={iconSrc} alt={altText} />
                            </span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
}




export default NavLinks