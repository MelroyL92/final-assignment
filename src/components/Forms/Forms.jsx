import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import './Forms.css'


// nog kijken hoe ik het issue met ID op kan lossen en hoe ik ervoor kan zorgen dat de data ook bij een refresh blijft bestaan!


function Forms () {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [submitted, setSubmitted] = useState(false);

        const [formValues, setFormValues] = useState({
            id: generateUniqueId(), // Include the unique ID
            subtitle: "",
            comment: "",
        });


    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('formData'));

        if (savedData) {
            setFormValues(savedData);
        }
    }, []);

    const handleSave = (data) => {
        const newFormData = {
            id: generateUniqueId(),
            ...data,
        };

        localStorage.setItem('formData', JSON.stringify(formValues));
        setSubmitted(true);
    };

        function generateUniqueId() {
            return `${Date.now()}-${Math.random().toString(36).substring(7)}`;
        }


// is de form submitted, indien de waarde ja is laat hij de tekst zien, zo niet dan wordt het form weergeven. Conditioneel, renderen
// Alles draait op de locale storage.
        return (
            <div className="parent-container">
                {submitted ? (
                    <div className="form-class">
                        <h4>Subtitle:</h4>
                        <p>{formValues.subtitle}</p>
                        <h4>Comment:</h4>
                        <p>{formValues.comment}</p>
                    </div>
                ) : (
                    <form className="form-class" onSubmit={handleSubmit(handleSave)}>
                        <label htmlFor="subtitle">Subtitle
                            <input
                                type="text"
                                id="subtitle"
                                {...register("subtitle", {
                                    required: "Subtitle is required",
                                })}
                            />
                            {errors.subtitle && <p>{errors.subtitle.message}</p>}
                        </label>
                        <label htmlFor="comment">Comments
                            <textarea
                                id="comment"
                                cols="30"
                                rows="3"
                                {...register("comment", {
                                    required: "Comments are required",
                                    minLength: {
                                        value: 20,
                                        message: "The minimum length is 20 characters",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "The maximum length is 100 characters",
                                    },
                                })}
                            />
                            {errors.comment && <p>{errors.comment.message}</p>}
                        </label>
                        <button type="submit">Save</button>
                    </form>
                )}
            </div>
        );

}


export default Forms