import './App.css'
import {Route, Routes} from "react-router-dom";
import SpecificWishlist from "./pages/SpecificWishlist/SpecificWishlist.jsx";
import SearchResultPage from "./pages/SearchResultsPage/SearchResultPage.jsx";
import GameDetail from "./pages/GameDetail/GameDetail.jsx";
import WishlistOverview from "./pages/WishlistOverview/WishlistOverview.jsx";
import About from "./pages/About/About.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";


function App() {




  return (
    <>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/GameDetail/:id" element={<GameDetail/>}/>
            <Route path="/SearchResultPage" element={<SearchResultPage/>}/>
            <Route path="/SpecificWishlist/:listName" element={<SpecificWishlist/>}/>
            <Route path="/WishlistOverview" element={<WishlistOverview/>}/>
            <Route path="/About" element={<About/>}/>
        </Routes>
    </>
  )
}

export default App
