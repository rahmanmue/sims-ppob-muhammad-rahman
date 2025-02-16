import React from 'react'
import ProfilePhoto from "@/assets/images/Profile Photo.png"
import { Pen, User, AtSign } from "lucide-react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useEffect, useState } from "react";
import ProfileService from "@/services/ProfileService";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { hideAlert, showAlert } from '@/store/slices/alertSlice';
import Alert from './Alert/Alert';

type ProfileType = {
    email: string;
    first_name: string;
    last_name: string;
    profile_image?: string;
  }

const AkunForm = () => {
    const navigate = useNavigate()
    const dispatchAlert = useDispatch()
    const alertState = useSelector((state:RootState)=> state.alertState)

    const[data, setData] = useState<ProfileType>({
        email:"",
        first_name:"",
        last_name:"",
        profile_image:""
    });

    const[changeEdit, setChangeEdit] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    dispatchAlert(hideAlert())

    try {
        if (!["image/jpeg", "image/png"].includes(file.type)) {
            dispatchAlert(showAlert({
                message: "Format file tidak didukung. Hanya JPEG dan PNG yang diperbolehkan.",
                status: "error"
            }))
            return
        }
        
        if (file.size > 100 * 1024) { 
            dispatchAlert(showAlert({
                message: "Ukuran file terlalu besar. Maksimum 100KB.",
                status: "error"
            }))
            return
        }

        const res = await ProfileService.UpdateProfileImage(file);
        const resJson = await res.json()
        if (!res.ok) throw new Error(resJson.message || "Terjadi Kesalahan");

        dispatchAlert(showAlert({message: "Success Update Image", status:"success"}))
        fetchProfile()

    } catch (error) {
        dispatchAlert(showAlert({
            message: error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui.", 
            status: "error" 
        }))
    }
    };
    
    
    const handleSave = async () => {
        if(!changeEdit) return

        try {
            
            if(data.first_name == "" || data.last_name == ""){
                dispatchAlert(showAlert({
                    message: "Data tidak boleh kosong",
                    status: "error"
                }))

                return
            }

            const nameRegex = /^[A-Za-z]+$/;

            if(!nameRegex.test(data.first_name) || !nameRegex.test(data.last_name)){
                dispatchAlert(showAlert({
                    message: "nama tidak boleh mengandung angka",
                    status: "error"
                }))

                return
            }

            const res = await ProfileService.UpdateProfile({
                first_name: data.first_name,
                last_name: data.last_name,
            }) 
            
            
            const resJson = await res.json();

            if(!res.ok){
                throw new Error(resJson.message || "Terjadi Kesalahan");
            }

            dispatchAlert(showAlert({
                message: resJson.message,
                status:"success"
            }))

            fetchProfile()
            
        } catch (error) {
            dispatchAlert(showAlert({
                message: error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui.", 
                status: "error" 
            }))
        }
    }

    const fetchProfile = async () => {
        try {
            const res = await ProfileService.GetProfile();
            const resJson = await res.json();
            if(!res.ok) throw new Error(resJson.message || "Terjadi Kesalahan");
            setData(resJson.data)
        } catch (error) {
            dispatchAlert(showAlert({
                message: error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui.", 
                status: "error" 
            }))
        }
    }
    
    useEffect(()=> {
        fetchProfile()
    }, [])

    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }


  return (
    <>
     <div className="my-8 w-36 relative mx-auto">
        <img src={data.profile_image?.includes("null") ? ProfilePhoto : data.profile_image} alt="profile" className="rounded-full w-30" />
        <div className="rounded-full border-2 text-gray-200 w-8 h-8 absolute right-8 bottom-0 bg-white">
          <input type="file" onChange={handleImageUpload} className="text-transparent z-10 top-1 w-5 left-0 absolute cursor-pointer"/>
          <Pen className="text-black absolute top-1 p-1"/>
        </div>
      </div>

      <div className="text-3xl font-bold mt-8 text-center">{data?.first_name + " " + data?.last_name}</div>

      <div className="container my-10">
        <div className="flex flex-col gap-3 md:px-28">
        {alertState.message && (
            <div className="w-full">
                <Alert/>
            </div>
        )}
        <label htmlFor="email" className="mt-2 text-gray-600 font-semibold">
              Email
          </label>
          <Input 
                name="email" 
                placeholder="email" 
                type="text"
                Icon={AtSign} 
                id="email"
                onChange = {handleChange}
                value={data?.email || ""}
                readOnly
                required
              />

          <label htmlFor="first_name" className="mt-2 text-gray-600 font-semibold">
            Nama Depan
          </label>
          <Input 
                name="first_name" 
                placeholder="nama depan" 
                type="text"
                Icon={User} 
                value={data?.first_name || ""}
                onChange = {handleChange}
                id="first_name"
                required
              />

          <label htmlFor="last_name" className="mt-2 text-gray-600 font-semibold">
              Nama Belakang
          </label>
          <Input 
                name="last_name" 
                placeholder="nama depan" 
                type="text"
                Icon={User} 
                value={data?.last_name || ""}
                onChange = {handleChange}
                id="last_name"
                required
              />
          {changeEdit ? (
            <Button title="Simpan" onClick={handleSave}/>
          ):(
            <>
              <Button title="Edit Profile" onClick={()=> setChangeEdit(!changeEdit)}/>
              <Button title="Logout" variant="secondary" onClick={logout}/>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AkunForm