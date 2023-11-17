import {createContext, useState} from "react";


export const GameInfoContext = createContext({});


const GameInfoContextProvider = ({children}) => {
 const [gameInfo, fetchGameInfo] = useState({})

 const data = {
  fetchGameInfo,
  gameInfo,
 }

 return (

     <GameInfoContext.Provider value={data}>
      {children}
     </GameInfoContext.Provider>

 )

}


export default GameInfoContextProvider