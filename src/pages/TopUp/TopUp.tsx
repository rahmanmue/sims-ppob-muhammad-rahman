import Input from '@/components/Input/Input'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal/Modal'
import {Banknote} from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { setTopUpAmount } from '@/store/slices/topUpSlice'
import { RootState } from "@/store/store";
import Alert from '@/components/Alert/Alert'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const moneyTopUp = [
    {
        nominal : "Rp10.000",
        value: 10000
    },
    {
        nominal : "Rp20.000",
        value: 20000
    },
    {
        nominal : "Rp50.000",
        value: 50000
    },
    {
        nominal : "Rp100.000",
        value: 100000
    },
    {
        nominal : "Rp250.000",
        value: 250000
    },
    {
        nominal : "Rp500.000",
        value: 500000
    }
]

const TopUp = () => {
    const navigate = useNavigate();
    
    useEffect(()=> {
        if(!localStorage.getItem("token")){
            navigate("/login")
        }
    },[])


    const dispatch = useDispatch();
    const topUpAmount = useSelector((state : RootState) => state.topUpState.top_up_amount);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTopUpAmount(Number(e.target.value) || 0));
      };
    const alertState = useSelector((state:RootState) => state.alertState)
    
    return (
    <>
        <title>top up</title>
        <Layout>
            <div>
                <span className="text-gray-600">Silahkan Masukan</span>
                <h1 className="text-4xl font-semibold">Nominal Top Up</h1>
            </div>

            <div className="grid md:grid-cols-5 grid-cols-1 gap-3 items-start">
                <div className="col-span-3 gap-3">
                    <div className="flex flex-col gap-1 mt-5">
                        <Input 
                            placeholder="masukan nominal Top Up" 
                            onChange = {handleChange}
                            value={topUpAmount || ""}
                            min="1"
                            Icon={Banknote} name="nominal" 
                            type="number"/>
                        <Modal type="TOPUP"/>
                        {alertState.message &&  <Alert/>}
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-3 gap-3 mt-5">
                        {moneyTopUp.map((m, index)=> (
                            <div key={index} className="p-2 border-gray-300 border-2 text-center text-gray-600 cursor-pointer"
                            onClick={() => dispatch(setTopUpAmount(m.value))}
                            > {m.nominal}</div>
                        ))}
                    </div>
                </div>
            </div>

        </Layout>
    </>
  )
}

export default TopUp