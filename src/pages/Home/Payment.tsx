import Layout from '@/components/Layout'
import Input from '@/components/Input/Input'
import { Banknote } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import Modal from '@/components/Modal/Modal'

const Payment = () => {
  const location = useLocation();
  return (
    <>
        <title>Pembelian</title>
        <Layout>
            <h1 className="text-xl text-gray-600 font-semibold">Pembayaran</h1>
            <div className="flex items-center">
                <img src={location.state.service_icon} alt="listrik" className="rounded-full w-12" />
                <span className="text-md font-semibold">{location.state.service_name}</span>
            </div>

            <div className="flex flex-col gap-1 mt-5">
                <Input placeholder="masukan nominal Top Up" value={location.state.service_tariff} Icon={Banknote} name="nominal" type="number"/>
                <Modal type="PAYMENT"/>
            </div>
        </Layout>
    </>
  )
}

export default Payment