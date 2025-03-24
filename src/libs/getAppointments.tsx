export default async function getUserAppointments(token:string){
    const response = await fetch(`https://localhost:5003/api/v1/appointments`, {
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`,
        }
    })

    if(!response.ok){
        throw new Error("Cannot get user profile")
    }
    return await response.json()
}