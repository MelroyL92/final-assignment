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
import ProtectedRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import {useContext} from "react";
import {AuthContext} from "./Context/AuthContext.jsx";


function App() {
    const { user} = useContext(AuthContext);


  return (
    <>
        <Routes>
            <Route path="/" element={<Homepage/>}/>

            <Route path="/SearchResultPage" element={<SearchResultPage/>}/>
            <Route element={<ProtectedRoute user={user} />}>
                <Route path="/SpecificWishlist/:listName" element={<SpecificWishlist/>}/>
                <Route path="/WishlistOverview" element={<WishlistOverview/>}/>
                <Route path="/GameDetail/:id" element={<GameDetail/>}/>
                <Route path="/ProfilePage" element={<ProfilePage/>}/>
            </Route>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/About" element={<About/>}/>

        </Routes>
    </>
  )
}

export default App
