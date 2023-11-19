import {createContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";



export const SearchBarContext = createContext();


const SearchBarContextProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [gameResult, setGameResult] = useState([])
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }


    const handleSearch = async (param) => {
        setError(false);
        setLoading(true);

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
                endpoint = `genres?key=${import.meta.env.VITE_REACT_API_KEY}`;
                break;
            case 'publisher':
                endpoint = `publishers?key=${import.meta.env.VITE_REACT_API_KEY}`;
                break;
            default:
                endpoint = `games?search=${searchTerm}&key=${import.meta.env.VITE_REACT_API_KEY}`;
                break;
        }
        const apiUrl = baseUrl + endpoint;

        try {
            const response = await axios.get(apiUrl);
            const responseData = response.data;

            if (responseData.results && responseData.results.length === 0) {
                setError(true);
            } else {
                setGameResult(responseData);
                navigate('/SearchResultPage');
            }
        } catch (e) {
            console.error(e);
            setError(true);
        } finally {
            setLoading(false)
        }
    };

    return (

        <SearchBarContext.Provider value={{gameResult, setGameResult , handleSearch, setSearchTerm, handleChange, error, loading}}>
            {children}
        </SearchBarContext.Provider>

    )

}

export default SearchBarContextProvider