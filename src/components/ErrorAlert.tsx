
import { FaRegSadCry } from 'react-icons/fa'

export const ErrorAlert = () => {
    return (
        <div className="container_error">
            <div className="container_bloob">
                <Bloob />
            </div>
            <p className="text-error">
                Es necesario tu <span>ubicación</span> para usar la aplicación
            </p>
            <FaRegSadCry className='icon' />
        </div>
    )
}

const Bloob = () => {
    return (
        <svg
            className='svg_bloob'
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <clipPath id="shape">
                    <path fill="currentColor" d="M878,635.5Q771,771,635.5,796.5Q500,822,394.5,766.5Q289,711,160,605.5Q31,500,138,372.5Q245,245,372.5,165Q500,85,595.5,197Q691,309,838,404.5Q985,500,878,635.5Z"></path>
                </clipPath>
            </defs>
            <g clipPath="url(#shape)">
                <path className='path_bloob'  d="M878,635.5Q771,771,635.5,796.5Q500,822,394.5,766.5Q289,711,160,605.5Q31,500,138,372.5Q245,245,372.5,165Q500,85,595.5,197Q691,309,838,404.5Q985,500,878,635.5Z" />
            </g>
        </svg>
    )
};