import {useEffect, useState} from "react";


const Input = ({label, type, name, value,onChange}) => {

        // const [comment, setComment] = useState(storedComment)
        //
        // useEffect( ()=> {
        //
        //     localStorage.setItem('comment', JSON.stringify(comment))
        //
        //
        // },[comment])

        const handleChange = (event) => {
            const newValue = event.target.value;
            setInputValue(newValue);
        }

    return (
        <div className="form-class">
            <label htmlFor={name}>{label}:</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default Input