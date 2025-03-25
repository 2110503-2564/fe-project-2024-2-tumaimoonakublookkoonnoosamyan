import getAppointments from "./getAppointments"

interface AppointmentItem {
    user: string;
}

export default async function getUserAppointments(token:string,userID:string){

    const appointments = await getAppointments(token)

    const response = appointments.data.find((item: AppointmentItem)=> item.user===userID)

    if(!response.ok){
        throw new Error("Cannot get user profile")
    }
    return await response.json()
}