import {createContext, useContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";



export const SearchBarContext = createContext();


const SearchBarContextProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [gameResult, setGameResult] = useState([])
    const [loader, setLoader] = useState(false)


    const handleSearch = async (param) => {

        setError(false);
        setLoader(false);

        let baseUrl = 'https://api.rawg.io/api/';
        let endpoint = '';

        switch (param) {
            case 'name':
                endpoint = `games?search=${searchTerm}&key=${import.meta.env.VITE_REACT_API_KEY}`;
                break;
            case 'developer':
                endpoint = `developers?key=${import.meta.env.VITE_REACT_API_KEY}`;
                break;
            case 'genre':
                endpoint = `genres?search=${searchTerm}&key=${import.meta.env.VITE_REACT_API_KEY}`;
                break;
            case 'publisher':
                endpoint = `publishers?key=${import.meta.env.VITE_REACT_API_KEY}`;
                break;
            default:
                // Handle default case
                break;
        }
        const apiUrl = baseUrl + endpoint;
        console.log('Constructed API URL:', apiUrl);

        try {
            const response = await axios.get(apiUrl);
            console.log(response)
            const responseData = response.data;
            setGameResult(responseData);
            navigate('/SearchResultPage');
        } catch (e) {
            console.error(e);
            setError(true);
            setLoader(true);
        }
    };

    return (

        <SearchBarContext.Provider value={{gameResult, setGameResult , handleSearch}}>
            {children}
        </SearchBarContext.Provider>

    )

}

export default SearchBarContextProvider