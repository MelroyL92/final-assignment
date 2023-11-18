import {Controller} from "react-hook-form";
import {forwardRef} from "react";


const TextArea = forwardRef(({ inputLabel, inputId, validationRules, control, errors, rows, cols, inputName }, ref) => {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <Controller
                    name={inputName}
                    id={inputId}
                    control={control}
                    render={({ field }) => <textarea className="color-style" {...field} rows={rows} cols={cols} ref={ref} />}
                />
            </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;