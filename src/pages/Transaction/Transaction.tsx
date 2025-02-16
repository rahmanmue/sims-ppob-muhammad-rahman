import { useEffect, useMemo, useState } from 'react'
import Layout from '@/components/Layout'
import TransactionService from '@/services/TransactionService';
import { formatDate } from '@/utils/formatDate';
import { useNavigate } from 'react-router-dom';


const getMonths = () => {
    const months = [];
   
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setMonth(3 + i)
  
      months.push({
        idx: date.getMonth(), 
        name: date.toLocaleString("en-US", { month: "long" })
      });
    }
  
    return months;
}; 

type Transaction = {
  invoice_number: string;
  transaction_type: "TOPUP" | "WITHDRAW" | "PAYMENT"; 
  description: string;
  total_amount: number;
  created_on: string; 
};


const Transaction = () => {
  const navigate = useNavigate();
      
    useEffect(()=> {
      if(!localStorage.getItem("token")){
          navigate("/login")
      }
    },[])
  


  const getMonth = useMemo(()=> getMonths(), []);
  const [limit, setLimit] = useState(2)
  const [history, setHistory] = useState<Transaction[]>([])
  
  const fetchHistory = async (limit:number) => {
    try {
      const res = await TransactionService.TransactionHistory(limit);
      const resJson = await res.json();
      // console.log(resJson)
      setHistory(resJson.data.records)
    } catch (error) {
      console.log(error)
    }
  }

  const showMore = () => {
    setLimit((prev)=> prev + 2)
    fetchHistory(limit)
  }

  useEffect(()=> {
    fetchHistory(limit)
  }, [limit])
    
  return (
    <>
        <title>transaction</title>
        <Layout>
            <div>
                <span className="text-xl text-gray-800 font-semibold">Semua Transaksi</span>
                <div className="flex gap-5 mt-2 mb-4">
                    {getMonth.map((m)=> (
                        <span key={m.idx} className="text-gray-600 font-semibold cursor-pointer">{m.name}</span>
                    ))}
                </div>


                <div className="flex flex-col gap-5">
                    {history?.length == 0 && (
                      <span className="text-gray-300 text-center">
                        Maaf tidak ada history transaksi saat ini
                      </span>
                    )}

                    {history?.map((h)=> (
                      <div key={h.invoice_number} className="border-2 border-gray-300 w-full flex justify-between rounded-md p-5">
                          <div className="flex flex-col gap-1">
                              
                                {h.transaction_type == "TOPUP" && ( <h2 className="text-2xl font-semibold text-green-400"> + Rp. {h.total_amount.toLocaleString()}</h2>)}
                                {h.transaction_type == "PAYMENT" && ( <h2 className="text-2xl font-semibold text-red-400"> - Rp. {h.total_amount.toLocaleString()}</h2>)}
                              
                              <small className="text-gray-400">{formatDate(h.created_on)}</small>
                          </div>
                          <span className="text-sm font-semibold text-gray-500">{h.description}</span>
                      </div>
                    ))}
                    
                    <span className="text-primary text-center font-semibold cursor-pointer" onClick={showMore}>Show more</span>


                </div>


            </div>

        </Layout>
    </>
  )
}

export default Transaction