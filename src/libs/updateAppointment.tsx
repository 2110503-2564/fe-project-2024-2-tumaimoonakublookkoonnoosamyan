export default async function getUserAppointments(token:string,id:string,shop:string,date:string){
    const response = await fetch(`https://localhost:5003/api/v1/appointments/${id}`, {
        method:"PUT",
        headers:{
            authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({
            user:id,
            massageShop:shop, 
            date:date,

        })
    })

    if(!response.ok){
        throw new Error("Cannot get user profile")
    }
    return await response.json()
}