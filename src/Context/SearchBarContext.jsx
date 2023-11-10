import {createContext, useContext, useState} from "react";
import {GameInfoContext} from "./GameInfoContext.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";



export const SearchBarContext = createContext();


const SearchBarContextProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [gameResult, setGameResult] = useState([])
    const [loader, setLoader] = useState(false)



    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = async () => {
        setError(false);
        setLoader(false)

            try {
                const response = await axios.get(`https://api.rawg.io/api/games?search=${searchTerm}&key=${import.meta.VITE_REACT_API_KEY}`);
                const responseData = response.data;
                setGameResult(responseData)
                    navigate('/SearchResultPage');
            } catch (e) {
                console.error(e);
                setError(true);
                setLoader(true);
            }
        }

    return (

        <SearchBarContext.Provider value={{gameResult, setGameResult , handleSearch, handleChange}}>
            {children}
        </SearchBarContext.Provider>

    )

}


export default SearchBarContextProvider
