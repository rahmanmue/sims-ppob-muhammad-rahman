import React from 'react'

type TransactionProps = {
    invoice_number?: string;
    transaction_type: "TOPUP"  | "PAYMENT"; 
    description: string;
    total_amount: number;
    created_on: string; 
  };
  

const HistoryCard: React.FC<TransactionProps> = ({ transaction_type, description, total_amount, created_on}) => {
  return (
    <>
        <div className="border-2 border-gray-300 w-full flex justify-between rounded-md py-3 px-5">
            <div className="flex flex-col gap-1">
                <h2 className={`text-2xl font-semibold ${transaction_type == "TOPUP" ? "text-green-400" : "text-red-400"}`}>
                    {transaction_type == "TOPUP" ?  `+` : `-`} {total_amount} 
                </h2>
                <small className="text-gray-400">{created_on}</small>
            </div>
            <span className="text-sm font-semibold text-gray-500">{description}</span>
        </div>
    </>
  )
}

export default HistoryCard