import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom"
import GameInfoContextProvider from "./Context/GameInfoContext.jsx";
import WishlistProvider from "./Context/WishlistContext.jsx";
import SearchBarContextProvider from "./Context/SearchBarContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(

      <Router>
          <SearchBarContextProvider>
          <GameInfoContextProvider>
          <WishlistProvider>
             <App />
          </WishlistProvider>
          </GameInfoContextProvider>
          </SearchBarContextProvider>
      </Router>

)
