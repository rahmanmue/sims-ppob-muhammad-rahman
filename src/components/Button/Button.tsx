import React from 'react'

type ButtonProps = {
    title: string;
    variant?: "primary" | "secondary" 
    [key: string]: unknown
}


const Button: React.FC<ButtonProps> = ({title, variant = "primary", ...props}) => {
    
    const checkVariant = 
    variant == "primary" ? "bg-primary text-white cursor-pointer" 
    : variant == "secondary" ? "bg-white text-primary border-primary border-2 cursor-pointer"
    : "";
 
    return (
    <button
        className={`${checkVariant} font-semibold py-2 px-4 rounded mt-2 w-full focus:outline-none focus:shadow-outline`}
        {...props}
    >
        {title}
    </button>
  )
}

export default Button