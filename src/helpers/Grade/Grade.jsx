import {useState} from "react";
import './Grade.css'

function Grade () {
    const [grade,setGrade] = useState(0)

    const handleSliderChange = (event) => {
        setGrade(parseInt(event.target.value, 10));
    };

    return (
        <div className="circle-container">
            <div className="circle">
                {grade}
            </div>
            <input
            type="range"
            min="0"
            max="10"
            value={grade}
            onChange={handleSliderChange}
            />
        </div>

    )
}

export default Grade;