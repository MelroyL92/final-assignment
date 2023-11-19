import axios from "axios";
import {useForm} from "react-hook-form";
import { useState} from "react";
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import "./ProfileEdit.css"

function ProfileEdit () {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [error, toggleError] = useState(false)

    const token =  localStorage.getItem('token')

    async function edit (data) {


        try {
            const response = await axios.put(
                'https://frontend-educational-backend.herokuapp.com/api/user',
                {
                    email: data.email,
                    password: data.password,
                    repeatedPassword: data.repeatedPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('You have now edited your information');
        } catch (e) {
            toggleError(true);
        }
    }

    const isValidEmailFormat = (email) => {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailTest.test(email);
    };

    const handleEditUser = async (data) => {
        const hasNewEmail = !!data.email;
        const hasNewPassword = !!data.password;

        if (hasNewEmail && !isValidEmailFormat(data.email)) {
            alert('Please fill in a valid email');
            return;
        }

        if (hasNewPassword && data.password !== data['repeatedPassword']) {
            setPasswordsMatch(false);
            return;
        }

        if (hasNewEmail || hasNewPassword) {
            const requestData = {};

            if (hasNewEmail) {
                requestData.email = data.email;
            }

            if (hasNewPassword) {
                requestData.password = data.password;
                requestData.repeatedPassword = data['repeatedPassword'];
            }

            await edit(requestData);
            setPasswordsMatch(true);
        } else {
            alert('No changes made. Please update email, password, or both.');
        }
    };

    return (

        <div className="edit-wrapper">
        <form onSubmit={handleSubmit(handleEditUser)} >
            <div className="form-profile color-style border-radius">
                <p>Email</p>
            <Input
                inputName="email"
                inputId="edit-email"
                validationRules={{
                    required: {
                        value: false,
                        message: "to change your information the name is required",
                    }
                }}
                register={register}
                errors={errors}
            />
        </div>
            <div className=" form-profile color-style border-radius">
                <p>Password</p>
            <Input
                inputName="password"
                inputType="text"
                inputId="edit-password"
                validationRules={{
                    required: {
                        value: false,
                        message: ""
                }}
                }
                register={register}
                errors={errors}
            />
        </div>
            <div className="form-profile color-style border-radius">
                <p>Repeat your password</p>
            <Input
                inputName="repeatedPassword"
                inputType="text"
                inputId="repeatedPassword"
                validationRules={{
                    required: {
                        value: false,
                        message: ""
                    }}
                }
                register={register}
                errors={errors}
            />
            {!passwordsMatch && (
                <p>Passwords do not match. Please try again.</p>
            )}
            </div>

            <Button type="submit" label="Change information" className="color-style border-radius"/>
        </form>
        </div>

    )
}


export default ProfileEdit