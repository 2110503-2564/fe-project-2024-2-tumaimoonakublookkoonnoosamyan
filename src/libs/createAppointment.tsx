export default async function createAppointment(token:string,shopID:string,date:string,time:string) {

    const response = await fetch(`http://localhost:5003/api/v1/massageShops/${shopID}/appointments` , {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({
            time:time,
            date:date,
        })
    })

    if(!response.ok){
        throw new Error("Failed to create Appointment")
    }

    return await response.json()

}