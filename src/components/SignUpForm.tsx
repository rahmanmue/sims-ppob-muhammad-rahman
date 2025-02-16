import React, { useActionState } from 'react'
import logo from "@/assets/images/Logo.png"
import Input from '@/components/Input/Input';
import { AtSign, User, Lock } from 'lucide-react';
import Button from '@/components/Button/Button';
import Alert from './Alert/Alert';
import { Link } from 'react-router-dom';
import AuthService from '@/services/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { hideAlert, showAlert } from '@/store/slices/alertSlice';

type initialStateType = {
  email: string; 
  first_name: string; 
  last_name:string;  
  password: string;  
  confirm_password: string;
  errors: {
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    confirm_password?: string;
  };
}

const initialState : initialStateType = { 
  email: "", 
  first_name: "", 
  last_name: "", 
  password: "", 
  confirm_password: "", 
  errors: {} 
}


const validateForm =  (prevState: initialStateType, action: { name: string; value: string; } ) => {

  if(action.name === "reset") return initialState;

  const newState = {...prevState, [action.name]: action.value}

  const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(action.name == "email" && !emailRegex.test(action.value as string)){
    newState.errors.email = "email tidak valid"
  }else{
     delete newState.errors.email;
  }

  const nameRegex = /^[A-Za-z]+$/;
  if(action.name == "first_name" && !nameRegex.test(action.value as string)){
    newState.errors.first_name = "nama depan tidak boleh mengandung angka"
  }else{
    delete newState.errors.first_name
  }

  if(action.name == "last_name" && !nameRegex.test(action.value as string)){
    newState.errors.last_name = "nama belakang tidak boleh mengandung angka"
  }else{
    delete newState.errors.last_name
  }


  if(action.name === "password" && action.value.length < 8){
      newState.errors.password = "password minimal 8 karakter";
  }else if(action.name === "password" && action.value.length == 8) {
      delete newState.errors.password
  }
  
  if (action.name === "confirm_password" && action.value !== newState.password) {
      newState.errors.confirm_password = "password tidak sama";
  }else if(action.name === "confirm_password" && action.value === newState.password){
      delete newState.errors.confirm_password
  }

  return newState;       
}


const SignUpForm = () => {
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

        const res = await AuthService.Registration({
            email : state.email,
            first_name: state.first_name,
            last_name: state.last_name,
            password: state.password
        })
        
        const resJson = await res.json();

        if(!res.ok){
          throw new Error(resJson.message || "Terjadi Kesalahan coba lagi")
        }

        dispatchAlert(showAlert({message: resJson.message, status: "success"}))
        
        dispatch({
          name: "reset",
          value: ''
        })

      } catch (error: unknown) {
          dispatchAlert(showAlert({ 
            message: error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui.", 
            status: "error" 
          }))
          

      }

   }
  
  return (
    <div className="flex flex-col gap-8 text-center justify-center my-10 lg:mx-10">
      <div className="flex gap-2 justify-center">
          <img src={logo} alt="logo" className="max-w-full" />
          <h1 className="text-3xl font-bold text-gray-800">SIMS PPOB</h1>
      </div>

      <h1 className="text-3xl font-semibold text-gray-800 px-12 lg:px-32">Lengkapi data untuk membuat akun</h1>

      <div className="lg:px-20 px-12">
      {alertState.message && <Alert/> }
        <form onSubmit={handleSubmit}  className="w-full flex flex-col gap-8">
          <div className="relative">
            <Input 
              name="email"
              placeholder="masukan email anda" 
              type="email"
              error={state.errors.email} 
              Icon={AtSign} 
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
              name="first_name" 
              placeholder="nama depan" 
              type="text" 
              required
              error={state.errors.first_name} 
              Icon={User}
              onChange = {(e: React.ChangeEvent<HTMLInputElement>) => dispatch({name:"first_name", value: e.target.value})}
              value={state.first_name}
            />
             {state.errors.first_name && (
                <span className="absolute bottom-[-1rem] right-0 text-red-500 text-xs text-end">{state.errors.first_name}</span>)
              }

          </div>

          <div className="relative">
            <Input 
              name="last_name" 
              placeholder="nama belakang" 
              required
              type="text" 
              error={state.errors.last_name} 
              Icon={User}
              onChange = {(e: React.ChangeEvent<HTMLInputElement>) => dispatch({name:"last_name", value: e.target.value})}
              value={state.last_name}
            />
            {state.errors.last_name && (
                <span className="absolute bottom-[-1rem] right-0 text-red-500 text-xs text-end">{state.errors.last_name}</span>)
            }

          </div>

          <div className="relative">
              <Input 
                name="password" 
                placeholder="buat password" 
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
          <div className="relative">
              <Input 
                name="confirm_password" 
                placeholder="konfirmasi password" 
                type="password" 
                Icon={Lock} 
                required
                error={state.errors.confirm_password}
                onChange = {(e: React.ChangeEvent<HTMLInputElement>) => dispatch({name:"confirm_password", value: e.target.value})}
                value={state.confirm_password}
              />
              {state.errors.confirm_password && (
                  <span className="absolute bottom-[-1rem] right-0 text-red-500 text-xs">{state.errors.confirm_password}</span>)
              }
          </div>
          <Button title="Registrasi" type="submit"/>
        </form>
      </div>

      <span className="text-xs text-gray-400">Sudah punya akun ? login <Link to="/login" className="text-primary">disini</Link></span>
    </div>
  )
}

export default SignUpForm