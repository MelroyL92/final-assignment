import {useContext} from "react";
import {AuthContext} from "../../Context/AuthContext.jsx";


function ProfilePage () {
    const {user} = useContext(AuthContext)
    console.log(user)




    return(
        <>
        <h2> welcome {user.username}!</h2>
        <p>click here to go to the homepage</p>
        <p>click here to go searching for games right away!</p>
            <p>click here to logout!</p>
        </>



    )

}

export default ProfilePage