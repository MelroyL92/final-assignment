import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const [error, toggleError] = useState(false)
    const [isAuth, toggleIsAuth] = useState({
        isAuthenticated: false,
        user: 'null',
        status: 'pending',
    });


    useEffect( ()=> {

      const token =  localStorage.getItem('token')

        if (token) {
            void login(token)
        } else {
            toggleIsAuth({
                ...isAuth,
                status: 'done',
            });
        }


      },[])


    const navigate = useNavigate();


    async function login (token) {   // hier wordt de token ontvangen vanuit de Login page

        localStorage.setItem('token', token)

        try {
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // vanuit de api gehaald
                }
            });
            console.log(response)

            toggleIsAuth({
                isAuthenticated: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                    profilePicture: response.data.profilePicture
                },
                status: 'done',

            });
        } catch(e) {
            console.error(e)
            toggleIsAuth({
                ...isAuth,
                status: 'done',
            })
            toggleError(true);
        }

        navigate('/ProfilePage')
        console.log("de gebruiker is ingelogd") // zorgen dat de gebruiker een melding krijgt, daarna verwijderen
    }


    function logout() {
        console.log("de gebruiker is uitgelogd") // zorgen dat de gebruiker een melding krijgt, daarna verwijderen
        toggleIsAuth({
            isAuthenticated: false,
            user: 'null',
            status: 'done',
        });
        navigate('/');
    }





    const contextData = {
       ...isAuth,
        logout,
        login
    }

    return (

        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>loading!!</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;