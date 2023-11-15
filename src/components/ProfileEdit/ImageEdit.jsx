import axios from "axios";
import {useState} from "react";
import Button from "../Forms/Button/Button.jsx";


function ImageEdit () {

    const [error, toggleError] = useState(false)
    const token =  localStorage.getItem('token')
    const [image, setImage] = useState("")


    async function addImage () {
        console.log(token)
        try {
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
            console.log(response);
            alert('You have now edited your information');
        } catch (e) {
            toggleError(true);
        }
    }





    function convertToBase64(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            setImage(reader.result);
            console.log(image); // Move the console.log inside the onload callback
        };

        reader.onerror = error => {
            console.log("error", error);
        }
    }



    return(
        <div>
            <div>
                <input
                    accept="image/*"
                    type="file"
                    onChange={convertToBase64}
                />
                {image && <img src={image} alt="profile-image" width={40} height={40}/> }
            </div>
        <Button type="submit" label="upload image" clickHandler={addImage}/>


        </div>
    )

}

export default ImageEdit