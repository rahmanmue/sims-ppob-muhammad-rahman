import Layout from '@/components/Layout'
import InformationService from '@/services/InformationService';
import { setPayment } from '@/store/slices/paymentSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type Service = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

type Banner = {
  banner_name: string;
  banner_image: string;
  description: string;
};  


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[service, setDataService] = useState<Service[]>([]);
  const[banner, setDataBanner] = useState<Banner[]>([]);

  const fetchDataService = async () => {
    try {
      const res = await InformationService.GetServices();
      const resJson = await res.json();
      const services = resJson.data 
      setDataService(services || [])
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBanner = async () => {
    try {
      const res = await InformationService.GetBanner();
      const resJson = await res.json();
      const banners = resJson.data 
      setDataBanner(banners || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    fetchBanner()
    fetchDataService()
  }, [])

  const handlePayment = (data:Service) => {
    dispatch(setPayment(data))
    navigate('/payment', {state: data})
  }

  return (
    <>
        <title>Home</title>
        <Layout>
            <div className="flex flex-wrap w-full">
                {service?.map((ds) => (
                    <div 
                      key={ds.service_code} 
                      className="flex flex-col gap-5 justify-start items-center w-24 cursor-pointer"
                      onClick={() => handlePayment(ds)}
                      >
                        <img src={ds.service_icon as string} alt={ds.service_name} />
                        <span className="md:text-md text-xs text-center">{ds.service_name}</span>
                    </div>
                ))}
            </div>

            <div className="mt-10">
                <span className="text-gray-800 font-bold">Temukan promo menarik</span>

                <div className="flex gap-3 mt-5 overflow-x-auto ">
                    {banner?.map((bd, index)=> (
                        <img 
                            key={index}
                            src={bd.banner_image as string} alt={bd.banner_name} 
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    ))}
                </div>
            </div>
        </Layout>
    </>
    
  )
}

export default Home