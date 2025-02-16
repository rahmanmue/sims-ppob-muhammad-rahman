import { useState } from "react";
import Logo from "@/assets/images/Logo.png"
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TransactionService from "@/services/TransactionService";
import { CircleCheck, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { showAlert } from "@/store/slices/alertSlice";
import { useAppDispatch } from "@/hook/hook";
import { fetchBalance, fetchProfile } from "@/store/slices/profileSlice";

type ModalType = {
  type : "TOPUP" | "PAYMENT"
}

const Modal: React.FC<ModalType> = ({type}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatchAlert = useDispatch();
  const topUpAmount = useSelector((state: RootState) => state.topUpState.top_up_amount);
  const paymentState = useSelector((state: RootState) => state.paymentState)
  const dispatch = useAppDispatch();
  
  const [notification, setNotification] = useState({
    show:false,
    status: false
  });


  const handleTransaction = async () => {
     if(type == "TOPUP"){
        await handleTopUp()
     }

     if(type == "PAYMENT"){
        await handlePayment()
     }

     dispatch(fetchProfile());
     dispatch(fetchBalance());
  }


  const handlePayment = async() =>{
    try {
      setNotification({show:false,status: false})
      const res = await TransactionService.Transaction({
        service_code: paymentState.service_code
      })

      if(!res.ok){
        setNotification({show:true, status:false})
        return
      }
      // console.log(resJson.message)
      setNotification({show:true, status:true})
      setIsOpen(false);
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleTopUp = async () => {

    if(topUpAmount < 10000 || topUpAmount > 1000000){
      setIsOpen(false)
      dispatchAlert(showAlert({message: "Masukan Nominal yang sesuai Rp. 10.000 - Rp.1.000.000",status: "error"}))
      return
    }

    try {
      setNotification({show:false,status: false})
      const res = await TransactionService.TopUp({
        top_up_amount : topUpAmount
      })
      // const resJson = await res.json()
      if(!res.ok){
        setNotification({show:true, status:false})
        return
      }
      // console.log(resJson.message)
      setNotification({show:true, status:true})
      setIsOpen(false);
      return
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex justify-center items-center">
      {type == "TOPUP" && (
        <button
          className={`${topUpAmount === 0? "cursor-not-allowed bg-gray-500" : "bg-primary"} text-white cursor-pointer font-semibold py-2 px-4 rounded mt-2 w-full focus:outline-none focus:shadow-outline`}
          disabled={topUpAmount === 0}
          onClick={() => setIsOpen(true)}
        >
          Top Up
        </button>
      )}

      {type == "PAYMENT" && (
          <button
            className="bg-primary text-white cursor-pointer font-semibold py-2 px-4 rounded mt-2 w-full focus:outline-none focus:shadow-outline"
            onClick={() => setIsOpen(true)}
          >
          Bayar
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          onClick={() => setIsOpen(false)} 
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-lg w-80 text-center"
            onClick={(e) => e.stopPropagation()}
          > 
            <img src={Logo} alt="logo" className="h-auto w-auto mx-auto mb-4" />
            <p className="mb-2 text-md text-gray-600">
              {type == "TOPUP" && ("Anda yakin untuk Top Up sebesar")}
              {type == "PAYMENT" && (`Beli ${paymentState.service_name} senilai`)}
            </p>
            <h2 className="text-2xl font-bold mb-4">
              {type == "TOPUP" && (`Rp ${topUpAmount.toLocaleString()}`)}
              {type == "PAYMENT" && (`Rp. ${paymentState.service_tariff.toLocaleString()}`)}
              </h2>
            <button  
              className="px-4 cursor-pointer font-semibold text-primary"
              onClick={handleTransaction}
              >
                {type == "TOPUP" && ("Ya Lanjutkan Top Up")}
                {type == "PAYMENT" && ("Ya Lanjutkan Bayar")}
              </button>
            <button
              className="px-4 py-2 text-gray-600 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Batalkan
            </button>
          </div>
        </div>
      )}


    {notification.show && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          onClick={() => () => setNotification({...notification, show: false})} 
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-lg w-80 text-center"
            onClick={(e) => e.stopPropagation()}
          > 

            {notification.status ? (
              <CircleCheck size={30} className="bg-green-500 h-auto rounded-full text-white w-16 mx-auto mb-4"/>
            ) : (
              <X size={30} className="bg-primary h-auto rounded-full text-white w-16 mx-auto mb-4"/>
            )}
           
            <p className="mb-2 text-md text-gray-600">
            {type == "TOPUP" && ("Top Up sebesar")}
            {type == "PAYMENT" && (`Beli ${paymentState.service_name} senilai`)}
            </p>
            <h2 className="text-2xl font-bold">
              {type == "TOPUP" && (`Rp ${topUpAmount.toLocaleString()}`)}
              {type == "PAYMENT" && (`Rp. ${paymentState.service_tariff.toLocaleString()} senilai`)}
              </h2>
            <p className="textt-gray-800 text-center">
              
            {notification.status ? (
              "berhasil!"
            ) : (
              "gagal"
            )}
            </p>
           
            <button
              className="px-4 py-2 text-primary cursor-pointer"
              onClick={() => setNotification({...notification, show: false})}
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Modal;
