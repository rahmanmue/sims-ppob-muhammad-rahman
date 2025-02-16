import React, { useActionState } from 'react'
import logo from "@/assets/images/Logo.png"
import Input from '@/components/Input/Input';
import { AtSign, Lock } from 'lucide-react';
import Button from '@/components/Button/Button';
import Alert from './Alert/Alert';
import AuthService from '@/services/AuthService';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideAlert, showAlert } from '@/store/slices/alertSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type initialStateType = {
    email: string; 
    password: string;  
    errors: {
      email?: string;
      password?: string;
    };
  }

const initialState : initialStateType = { 
    email: "",      
    password: "", 
    errors: {} 
}


const validateForm = (prevState: initialStateType, action: { name: string; value: string; } ) => {

        if(action.name == "reset") return initialState;

        const newState = {...prevState, [action.name]: action.value}

        const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(action.name == "email" && !emailRegex.test(action.value as string)){
          newState.errors.email = "email tidak valid"
        }else{
           delete newState.errors.email;
        }
       
        if(action.name === "password" && action.value.length < 8){
            newState.errors.password = "password minimal 8 karakter";
        }else if(action.name === "password" && action.value.length == 8) {
            delete newState.errors.password
        }

        return newState; 
}


const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatchAlert = useDispatch();
  const alertState = useSelector((state:RootState)=> state.alertState)
  
   const [state, dispatch] = useActionState(
      validateForm,
      initialState
   )

   const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(Object.keys(state.errors).length > 0) return

      try {
        dispatchAlert(hideAlert())

        const res = await AuthService.Login({
            email: state.email,
            password: state.password
        })

        const resJson = await res.json();

        if(!res.ok){
            throw new Error(resJson.message || "Terjadi kesalahan coba lagi")
        }

        const {token} = resJson.data;
        localStorage.setItem("token", token);
 
        dispatch({
          name: "reset",
          value: ''
        })

        navigate("/", {replace: true})

      } catch (error) {
        dispatchAlert(showAlert({ 
            message: error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui.", 
            status: "error" 
        }))
      }

   }
  
  return (
    <>
        <div className="flex flex-col gap-8 text-center justify-center h-screen lg:mx-10">
        <div className="flex gap-2 justify-center">
            <img src={logo} alt="logo" className="max-w-full" />
            <h1 className="text-3xl font-bold text-gray-800">SIMS PPOB</h1>
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 px-12 lg:px-32">Masuk atau buat akun untuk memulai</h1>

        <div className="lg:px-20 px-12">
            <form onSubmit={handleSubmit}  className="w-full flex flex-col gap-8">
            <div className="relative">
                <Input 
                name="email"
                placeholder="masukan email anda" 
                type="email" 
                Icon={AtSign} 
                error = {state.errors.email}
                required 
                onChange = {(e: React.ChangeEvent<HTMLInputElement>) => dispatch({name:"email", value: e.target.value})}
                value={state.email}
                />
                {state.errors.email && (
                    <span className="absolute bottom-[-1rem] right-0 text-red-500 text-xs text-end">{state.errors.email}</span>)
                }
            </div>

        
            <div className="relative">
                <Input 
                    name="password" 
                    placeholder="masukan password anda" 
                    type="password" 
                    Icon={Lock} 
                    required
                    error={state.errors.password}
                    onChange = {(e: React.ChangeEvent<HTMLInputElement>) => dispatch({name:"password", value: e.target.value})}
                    value={state.password}
                />
                {state.errors.password && (
                    <span className="absolute bottom-[-1rem] right-0 text-red-500 text-xs text-end">{state.errors.password}</span>)
                }
            </div>
            
            <Button title="Masuk" type="submit"/>
            </form>
        </div>


        <span className="text-xs text-gray-400">Belum punya akun ? registrasi <Link to="/register" className="text-primary">disini</Link></span>
        
        
        </div>
        
        <div className="relative mx-10">
            {alertState.message && (
                <div className="absolute bottom-4 w-full">
                    <Alert/>
                </div>
            )}
        </div>
    </>
  )
}

export default SignUpForm