type RegistrationPayload = {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

type LoginPayload = {
    email: string;
    password: string;
}


export default class AuthService {
    private static BASE_URL = import.meta.env.VITE_API_URL;

    static async Registration(data:RegistrationPayload){
        const res = await fetch(`${this.BASE_URL}/registration`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        return res;
    }

    static async Login(data:LoginPayload){
        const res = await fetch(`${this.BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

       return res;
    }
}