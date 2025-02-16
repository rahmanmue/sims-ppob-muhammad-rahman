import AkunForm from "@/components/AkunForm";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Akun = () => {
  const navigate = useNavigate();
  useEffect(()=> {
      if(!localStorage.getItem("token")){
        navigate("/login")
      }
  },[])
  
  return (
      <>
        <title>Akun</title>
        <Navbar/>
        <AkunForm/>
      </>
    )
};

export default Akun;
