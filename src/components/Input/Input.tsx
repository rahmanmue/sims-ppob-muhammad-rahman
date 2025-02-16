import React, { useState } from 'react'
import {Eye, EyeOff} from "lucide-react"


type InputProps = {
    name: string;
    type: string;
    placeholder: string;
    error?:boolean | string;
    Icon?: React.ComponentType;
    [key: string]: unknown;
}

const Input: React.FC<InputProps> = ({ name, type, placeholder, error=false, Icon, ...props }) => {
    const[showPassword, setShowPassword] = useState<boolean>(true)
    return (
    <div className="relative">
        {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Icon/>
             </div>    
        )}
        <input 
            type={type == "password" && showPassword ? "text" : type } 
            name={name}
            placeholder ={placeholder}
            className={
                `${error ? "border-red-400" : "border-gray-200"} py-3 pl-10 block w-full 
                border-2 rounded-sm text-md font-medium text-gray-800
                focus:outline-none box-border
                disabled:opacity-50 disabled:pointer-events-none`
            } 
            {...props}
        />

        {type == "password" ? (
            <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                onClick={()=> setShowPassword(!showPassword)}
            >
               {showPassword ? (<Eye/> ): (<EyeOff/>)}
            </div> 
        ): ""}
    </div>
  )
}

export default Input