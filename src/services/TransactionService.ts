type TransactionPayload = {
   service_code: string;
}

type TopUpPayload = {
   top_up_amount: number
}


export default class TransactionService {
    private static BASE_URL = import.meta.env.VITE_API_URL;

    static async GetBalance(){
        const res = await fetch(`${this.BASE_URL}/balance`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token') as string}`
            }
        })

        return res;
    }

    static async TopUp(data:TopUpPayload){
        const res = await fetch(`${this.BASE_URL}/topup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token') as string}`
            },
            body: JSON.stringify(data)
        })

       return res;
    }

    static async Transaction(data:TransactionPayload){
        const res = await fetch(`${this.BASE_URL}/transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token') as string}`
            },
            body: JSON.stringify(data)
        })

       return res;
    }

    static async TransactionHistory(limit:number){
        const res = await fetch(`${this.BASE_URL}/transaction/history?limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token') as string}`

            },
        })

       return res;
    }
}