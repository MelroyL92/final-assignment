import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader.jsx";


export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuthenticated: false,
        user: '',
        status: 'pending',
    });


    useEffect( ()=> {

      const token =  localStorage.getItem('token');

        if (token) {
            void login(token);
        } else {
            toggleIsAuth({
                ...isAuth,
                status: 'done',
            });
        }


      },[])


    const navigate = useNavigate();


    async function login (token) {

        localStorage.setItem('token', token);

        try {
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // vanuit de api gehaald
                }
            });
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
        }

        navigate('/ProfilePage')
    }


    function logout() {
        toggleIsAuth({
            isAuthenticated: false,
            user: '',
            status: 'done',
        });
        localStorage.removeItem('token');
        navigate('/');
    }

    const contextData = {
       ...isAuth,
        logout,
        login
    }

    return (

        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children :<Loader/>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;