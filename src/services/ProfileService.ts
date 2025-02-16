type ProfilePayload = {
    email?: string;
    first_name: string;
    last_name: string;
}



export default class ProfileService {
    private static BASE_URL = import.meta.env.VITE_API_URL;

    static async GetProfile(){
        const res = await fetch(`${this.BASE_URL}/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token') as string}`
            }
        })

        return res;
    }

    static async UpdateProfile(data:ProfilePayload){
        const res = await fetch(`${this.BASE_URL}/profile/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token') as string}`
            },
            body: JSON.stringify(data)
        })

       return res;
    }

    static async UpdateProfileImage(file:File){
      
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${this.BASE_URL}/profile/image`, {
            method: "PUT",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token') as string}`
            },
            body: formData
        })

       return res;
    }

}