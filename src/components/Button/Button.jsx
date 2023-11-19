import './Button.css'




const Button = ({type,className,id, name, clickHandler, label, iconSrc, altText}) => {

    return (
        <button
        type={type}
        className={className}
        onClick={clickHandler}
        id={id}
        name={name}
        >
            <span className="button-span">
            <span>{label}</span>
            {iconSrc &&<span className="icon-wrapper">  <img src={iconSrc} alt={altText} className="icon-wrapper" /></span>}
            </span>
        </button>

    )
}


export default Button