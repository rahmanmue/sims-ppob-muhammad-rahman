import SignInForm from '@/components/SignInForm'
import LoginBanner from "@/assets/images/Illustrasi Login.png"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const Login = () => {
const navigate = useNavigate();

useEffect(()=> {
    if(localStorage.getItem("token")){
        navigate("/")
    }
},[])

return(
    <>
    <title>Login</title>
    <div className="flex flex-col lg:flex-row items-center min-h-screen w-full">
        <div className="w-full lg:w-1/2">
            <SignInForm/>
        </div>

        <div className="hidden md:flex w-full lg:w-1/2 h-screen bg-[#fff1f0] justify-center">
            <img
            src={LoginBanner}
            alt="Login Illustration"
            className="max-w-ful h-full object-cover"
            />
        </div>
    </div>
    
    </>
  )
}

export default Login