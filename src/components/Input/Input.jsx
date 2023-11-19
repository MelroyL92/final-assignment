
const Input = ({inputType, inputName, inputLabel, inputId, validationRules, register, errors}) => {


    return (
        <>
       <label htmlFor={inputId} className="media-input color-style border-radius" >
           {inputLabel}
           <input className="media-input"
           type={inputType}
           id={inputId}
           {...register(inputName,validationRules)}
           />
       </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>
    );
}

export default Input
