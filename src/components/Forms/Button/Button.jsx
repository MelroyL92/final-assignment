




const Button = ({type,className,onClick,id, name}) => {



    const handleClick = () => {

        switch (name) {

            case "wishlist" :
                alert("Information has been stored in local storage")
                break;
            case "feedback form":
                alert("Thank you for the feedback, i really appreciate it!")
                break;
            default:
                alert("the information has been submitted")
        }
    }



    return (
        <button
        type={type}
        className={className}
        onClick={handleClick}
        id={id}
        name={name}
        >
        Button
        </button>

    )
}


export default Button