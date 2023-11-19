import axios from "axios";
import {useState} from "react";
import Button from "../Button/Button.jsx";
import './imageEditProfile.css';


function ImageEditProfile () {

    const [error, toggleError] = useState(false)
    const [image, setImage] = useState("")
    const [isEditing, setIsEditing] = useState(false);

    const token =  localStorage.getItem('token')


    async function addImage () {
        try {

            if (!image) {
                toggleError(true);
                return;
            }

            const response = await axios.post(
                'https://frontend-educational-backend.herokuapp.com/api/user/image',
                {
                    "base64Image":`${image}`
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('You have now edited your information');
            window.location.reload();
        } catch (e) {
            toggleError(true);
        }
    }

    function convertToBase64(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            setImage(reader.result);
            setIsEditing(true);
        };

        reader.onerror = error => {
            console.error("error", error);
        }
    }

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };


    return(
        <div>
            {isEditing ? (
                <div>
                        <label htmlFor="imageInput" className="color-style border-radius upload-button">
                        <input
                            id="imageInput"
                            accept="image/*"
                            type="file"
                            onChange={convertToBase64}
                            style={{ display: 'none' }}
                        />
                        Upload Image
                    </label>
                    {image && <img src={image} alt="profile-image" />}
                    <Button
                        className="overlay-button color-style border-radius"
                        type="submit"
                        label="Upload Image"
                        disabled={!image}
                        clickHandler={addImage}
                    />
                    <Button
                        className="overlay-button color-style border-radius"
                        label="Edit Image"
                        clickHandler={handleEditClick}
                    />
                </div>
            ) : (
                <Button className="overlay-button color-style border-radius" clickHandler={handleEditClick} label="edit image"/>
            )}
        </div>
    );
}



export default ImageEditProfile