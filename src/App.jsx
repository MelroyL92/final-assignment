import './App.css'
import {Route, Routes} from "react-router-dom";
import SpecificWishlist from "./pages/SpecificWishlist/SpecificWishlist.jsx";
import SearchResultPage from "./pages/SearchResultsPage/SearchResultPage.jsx";
import GameDetail from "./pages/GameDetail/GameDetail.jsx";
import WishlistOverview from "./pages/WishlistOverview/WishlistOverview.jsx";
import About from "./pages/About/About.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Login from "./pages/Login/SignIn.jsx"
import Register from "./pages/Register/Register.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx"


function App() {


  return (
    <>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/GameDetail/:id" element={<GameDetail/>}/>
            <Route path="/SearchResultPage" element={<SearchResultPage/>}/>
            <Route path="/SpecificWishlist/:listName" element={<SpecificWishlist/>} />
            <Route path="/WishlistOverview" element={<WishlistOverview/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path="/ProfilePage" element={<ProfilePage/>}/>
        </Routes>
    </>
  )
}

export default App
