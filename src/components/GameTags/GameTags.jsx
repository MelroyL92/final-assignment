import {useContext, useEffect, useState} from 'react';
import {GameInfoContext} from "../../Context/GameInfoContext.jsx";
import './GameTags.css'
import {CirclesWithBar} from "react-loader-spinner";



function GameTags ({type}) {
    const [tagInfo, setTagInfo] = useState(null);
    const {gameInfo} = useContext(GameInfoContext)


    useEffect(() => {

        switch (type) {

            case 'developer':
                setTagInfo (
                    <>
                        <h3>Developer:</h3>
                        <ul className="list-container">
                            {gameInfo && gameInfo.developers && gameInfo.developers.length > 0 && gameInfo.developers.map((developer) => (
                                <li className="tag-item" key={developer.id}>{developer.name}</li>
                            ))}
                        </ul>
                    </>
                );
                break;
            case 'publisher':
                setTagInfo (
                    <>
                        <h3>Publisher:</h3>
                        <ul className="list-container">
                            {gameInfo && gameInfo.publishers && gameInfo.publishers.length > 0 && gameInfo.publishers.map((publisher) => (
                                <li  className="tag-item" key={publisher.id}>{publisher.name}</li>
                            ))}
                        </ul>
                    </>

            );
                break;
            case 'tags':
                setTagInfo (
                    <>
                        <h3>Tags:</h3>
                        <ul className="list-container">
                            {gameInfo && gameInfo.tags && gameInfo.tags.length > 0 && gameInfo.tags.map((tag) => (
                                <li className="tag-item" key={tag.id}>{tag.name}</li>
                            ))}
                        </ul>
                    </>
                );
                break;
            case 'platform':
                setTagInfo (
                    <>
                        <h3>Platform:</h3>
                            <ul className="list-container">
                                {gameInfo && gameInfo.platforms && gameInfo.platforms.length > 0 && gameInfo.platforms.map((platform) => (
                                <li className="tag-item" key={platform.platform.id}>{platform.platform.name}</li>
                                ))}

                        </ul>
                    </>
                );
                break;
            default:
            return (
                'invalid input'
            )
        }
    }, [gameInfo, type])

    return (
        <>
            {tagInfo}
        </>
    )
}



    export default GameTags
