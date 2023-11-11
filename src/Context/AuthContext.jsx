import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

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
             login(token)
        } else {
            toggleIsAuth({
                ...isAuth,
                status: 'done',
            });
        }


      },[])


    const navigate = useNavigate();


    async function login (token) {   // hier wordt de token ontvangen vanuit de Login page

        localStorage.setItem('token', token)// accestoken opslaan in de local storage. Controleer nog wel de key vanuit de api e.d.
        // const info = jwtDecode(token)
        // const userId = info.sub  // haalt de info vanuit de jwt code

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
                    username: response.data.username, // controleren met api informatie (hoe krijgen we dit terug?)
                    email: response.data.email, // controleren met api informatie (hoe krijgen we dit terug?)
                    id: response.data.id, // controleren met api informatie (hoe krijgen we dit terug?)
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
        console.log("de gebruiker is ingelogd")


    }

    function logout() {
        console.log("de gebruiker is uitgelogd")
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