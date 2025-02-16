export default class InformationService {
    private static BASE_URL = import.meta.env.VITE_API_URL;

    static async GetBanner(){
        const res = await fetch(`${this.BASE_URL}/banner`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token') as string}`
            }
        })
        return res;
    }

    static async GetServices(){
        const res = await fetch(`${this.BASE_URL}/services`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token') as string}`
            }
        })

       return res;
    }
}