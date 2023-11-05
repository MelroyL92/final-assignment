import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";


// nog kijken hoe ik het issue met ID op kan lossen en hoe ik ervoor kan zorgen dat de data ook bij een refresh blijft bestaan!


function Forms () {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [submitted, setSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        subtitle: "",
        comment: "",
    })

    useEffect(() => {
        const savedSubtitle = localStorage.getItem('subtitle');
        if (savedSubtitle) {
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                subtitle: JSON.parse(savedSubtitle),
            }));
        }

        const savedComment = localStorage.getItem('comment');
        if (savedComment) {
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                comment: JSON.parse(savedComment),
            }));
        }
    }, []);


    const handleSave = (data) => {
        setFormValues(data);
        localStorage.setItem('subtitle', JSON.stringify(data.subtitle));
        localStorage.setItem('comment', JSON.stringify(data.comment));
        setSubmitted(true); // Mark the form as submitted
    }


// is de form submitted, indien de waarde ja is laat hij de tekst zien, zo niet dan wordt het form weergeven. Conditioneel, renderen
// Alles draait op de locale storage.
    return (
        <div>
            {submitted ? (
                <div>
                    <h4>Subtitle:</h4>
                    <p>{formValues.subtitle}</p>
                    <h4>Comment:</h4>
                    <p>{formValues.comment}</p>
                </div>
            ) : (
        <form onSubmit={handleSubmit(handleSave)}>
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