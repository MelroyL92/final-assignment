import {createContext, useState} from "react";
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
        console.log(searchTerm)
    }


    const handleSearch = async (param) => {
        console.log(searchTerm)
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
            case 'genre': // lastige is dat je hier alleen met id's kunt werken of dus zonder searchterm en de /
                endpoint = `genres/${searchTerm}?key=${import.meta.env.VITE_REACT_API_KEY}`;
                break;
            case 'publisher':
                endpoint = `publishers?key=${import.meta.env.VITE_REACT_API_KEY}`;
                break;
            default: // in de default ook degene van name gezet omdat op de 1 of andere manier soms de eerste keer een leeg object terug kwam
                endpoint = `games?search=${searchTerm}&key=${import.meta.env.VITE_REACT_API_KEY}`
                break;
        }
        const apiUrl = baseUrl + endpoint;

        try {
            const response = await axios.get(apiUrl);
            const responseData = response.data; // hiervoor een console.log verwijderd, werkt het nog?
            setGameResult(responseData);
            navigate('/SearchResultPage');
        } catch (e) {
            console.error(e);
            setError(true);
            setLoader(true);
        }
    };

    return (

        <SearchBarContext.Provider value={{gameResult, setGameResult , handleSearch, setSearchTerm, handleChange}}>
            {children}
        </SearchBarContext.Provider>

    )

}

export default SearchBarContextProvider