import {CirclesWithBar} from "react-loader-spinner";
import "./Loader.css";


const Loader = () => {
    return (
        <div className="loader-container">
                <CirclesWithBar
                    height="100"
                    width="100"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    outerCircleColor=""
                    innerCircleColor=""
                    barColor=""
                    ariaLabel='circles-with-bar-loading'
                />
        </div>
    );
};

export default Loader



