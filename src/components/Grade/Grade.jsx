
import './Grade.css'

function Grade ({minRange,maxRange,changeHandler,type,grade}) {

    return (
        <div className="circle-container">
            <p className="circle">{grade}</p>
            <input className="slider"
            type={type}
            value={grade}
            min={minRange}
            max={maxRange}
            onChange={changeHandler}
            />
        </div>

    )
}

export default Grade;