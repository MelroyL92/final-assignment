
import './Grade.css'

function Grade ({minRange,maxRange,changeHandler,type,grade}) {


        // if (grade < 4) {
        //     return 'orange';
        // } else if (grade < 7) {
        //     return 'yellow';
        // } else if (grade <10) {
        //     return 'green';
        // } else {
        //     return "white"
        // }



    return (
        <div className="circle-container">
            <p className="circle">{grade}</p>
            <input
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