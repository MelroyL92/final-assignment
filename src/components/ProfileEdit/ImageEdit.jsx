import axios from "axios";
import {useState} from "react";
import Button from "../Forms/Button/Button.jsx";


function ImageEdit () {

    const [error, toggleError] = useState(false)
    const [image, setImage] = useState("")
    const [isEditing, setIsEditing] = useState(false);

    const token =  localStorage.getItem('token')


    async function addImage () {
        try {

            if (!image) {
                // If no image is selected, display an error and return
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
                    <input accept="image/*" type="file" onChange={convertToBase64} className="upload-button" />
                    {image && <img src={image} alt="profile-image" width={40} height={40} />}
                    <Button  className="overlay-button" type="submit" label="Upload Image"  disabled={!image} clickHandler={addImage} />
                    <Button  className="overlay-button" label="Edit Image" clickHandler={handleEditClick} />
                </div>
            ) : (
                <button  className="overlay-button" onClick={handleEditClick}>Edit Image</button>
            )}
        </div>
    );
}



export default ImageEdit