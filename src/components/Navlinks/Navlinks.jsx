import {Link} from "react-router-dom"



function Navlinks (){

    return (
        <nav className="nav-links-parent">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="list">List</Link></li>
                <li><Link to="Search">Search</Link></li>
                <li><Link to="About">About</Link></li>
                <li><Link to="Login">Login</Link></li>
                <li><Link to="Register">Register</Link></li>
            </ul>

        </nav>
    )
}

export default Navlinks