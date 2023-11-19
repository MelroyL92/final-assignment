import {Link} from "react-router-dom"
import './Navlinks.css'


function NavLinks ({ to, iconSrc, altText, text }){

    return (
        <div className="nav-class color-style">
            <ul>
                <li className="nav-list-container ">
                    <Link className="Link-style" to={to}>
                        <div className="list-class ">
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