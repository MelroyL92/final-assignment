import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import './GameDetail.css'
import GameTags from "../../components/GameTags/GameTags.jsx";
import {GameInfoContext} from "../../Context/GameInfoContext.jsx";
import CreateAndAddToWishlist from "../../components/CreateAndAddToWishlist/CreateAndAddToWishlist.jsx";
import Purifyer from "../../helpers/Purifyer/Purifyer.jsx";
import Loader from "../../helpers/Loader/Loader.jsx";




function GameDetail () {
    const {gameInfo, fetchGameInfo} = useContext(GameInfoContext)
    const [error, toggleError] = useState(false)
    const [loading, setLoading] = useState(false)


    let { id } = useParams();


    useEffect(() => {

        async function fetchGameData() {
            toggleError(false)
            setLoading(true)

            try {
                const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_REACT_API_KEY}`)
                fetchGameInfo(response.data)
                console.log(gameInfo)
            } catch (e) {
                console.error(e)
                toggleError(true)
            } finally {
                setLoading(false)
            }

        }
        void fetchGameData()
    },[]);

    useEffect(()=> {
    },[gameInfo])


    return (
        <main>
        <header className="header-class-game-info">
            <img src={gameInfo.background_image} alt=""/>
            <img src={gameInfo.background_image_additional} alt=""/>
        </header>
            <div className="mid-section-wrapper">
       <section className="game-info-details">
           <div>
               <div>
                   <h1 className="line-spacing">{gameInfo.name}</h1>
                   <p className="line-spacing"><strong>Released:{gameInfo.released}</strong></p>
                    <Purifyer gameInfo={gameInfo}/>
                   {!gameInfo.description && <p>There is no description for {gameInfo.name}</p>}
               </div>
               <div >
                   <article>
                   <h3 >Metacritic</h3>
                       <p>This game has received a score of {gameInfo.metacritic}</p>
                       {!gameInfo.metacritic && <p>There are no metacritics available for {gameInfo.name}</p>}
                   </article>

               </div>
           </div>
       </section>
                <section className="tag-wrapper">
                    <article><GameTags
                        gameInfo={gameInfo}
                        type ='developer'/>
                    </article>
                    <article><GameTags
                        gameInfo={gameInfo}
                        type ='publisher'/>
                    </article>
                    <article><GameTags
                        gameInfo={gameInfo}
                        type ='tags'/>
                    </article>
                    <article><GameTags
                        gameInfo={gameInfo}
                        type ='platform'/>
                    </article>
                </section>
            </div>
            {error && <h1>Error fetching data</h1>}
            {loading && <div className="loader"><Loader/></div>}
            <footer className="footer-game-info">
                <div className="buttons-game-page">
                    <Link className="button-styling color-style Link-style" to="/SearchResultPage">back</Link>
                    <Link className="button-styling color-style Link-style" to="/">Home</Link>
                    <CreateAndAddToWishlist/>
                    <img className="rawg-pic" src="../../../src/assets/rawg-logo_750x430.jpg" alt="API logo"/>
                </div>
            </footer>
        </main>
    )
}

export default GameDetail