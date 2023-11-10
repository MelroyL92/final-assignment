import {useForm} from "react-hook-form";


function register () {
    const{regisyter, handleSubmit, formState: {errors}}= useForm();



    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <label htmlFor="name-field">
                Naam:
                <input
                    type="text"
                    id="name-field"
                    {...register("name", {
                        required: {
                            value: true,
                            message: 'Naam is verplicht',
                        }
                    })}
                />
            </label>
            {errors.name && <p>{errors.name.message}</p>}

            <button type="submit">
                Versturen
            </button>
        </form>
    );
}