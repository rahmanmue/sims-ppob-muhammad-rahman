import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import profilePhoto from "@/assets/images/Profile Photo.png"
import backgroundSaldo from "@/assets/images/Background Saldo.png"
// import TransactionService from '@/services/TransactionService'
// import ProfileService from '@/services/ProfileService'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { fetchBalance, fetchProfile } from '@/store/slices/profileSlice'
import { useAppDispatch } from '@/hook/hook'

type LayoutProps = {
    children : React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  const[showSaldo, setShowSaldo] = useState(true);
  const dispatch = useAppDispatch();
  const { balance, fullName, profileImage } = useSelector((state: RootState) => state.profile);
//   const [balance, setBalance] = useState('')
//   const [fullName, setFullName] = useState('')
//   const [profileImage, setProfileImage] = useState('')

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchBalance());
    }, [dispatch]);


//  useEffect(()=> {
//     const fetchBalance = async () => {
//         try {
//             const res = await TransactionService.GetBalance();
//             const resJson = await res.json();
//             setBalance(resJson.data.balance)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const fetchProfile = async () => {
//         try {
//             const res = await ProfileService.GetProfile();
//             const resJson = await res.json();
//             const {first_name, last_name, profile_image} = resJson.data;
//             setProfileImage(profile_image)
//             setFullName(`${first_name} ${last_name}`)
 
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     fetchProfile()
//     fetchBalance()
//  }, [])

  return (
    <>
        <Navbar/>
        <div className="container mt-8">
            <div className="grid md:grid-cols-5 grid-cols-1 gap-10 items-center">
                <div className="col-span-2">
                    <img src={profileImage.includes("null") ? profilePhoto : profileImage } alt="profile" className="mb-4 rounded-full w-20" />
                    <span className="text-gray-600">Selamat datang,</span>
                    <h1 className="text-4xl font-semibold mt-1">{fullName}</h1>
                </div>

                <div className="h-full col-span-3 bg-cover bg-no-repeat rounded-2xl" style={{backgroundImage:`url(${backgroundSaldo})`}}>
                   <div className="p-5 text-white">
                        <h2 className="md:text-xl text-xs">Saldo Anda</h2>
                        <div className="flex items-center gap-3 md:text-4xl text-4xl md:mt-5 my-2">
                            <span>Rp.</span>
                            <input type={showSaldo ? "text": "password"} value={balance.toLocaleString()} className="w-max" readOnly />
                        </div>
                        <span className="block md:text-xs md:mt-3 mt-2 text-[9px] cursor-pointer" onClick={()=> setShowSaldo(!showSaldo)}>{showSaldo ? "Tutup" : "Lihat"} Saldo</span>
                   </div>
                </div>
            </div>
        </div>

        <div className="container mt-14 mb-10">
            {children}
        </div>
    </>
  )
}

export default Layout