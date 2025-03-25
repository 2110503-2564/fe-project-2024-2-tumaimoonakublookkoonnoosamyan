export default async function updateAppointment(token: string,appointmentID:string, newDate: string,newTime:string) {
    const response = await fetch(`http://localhost:5003/api/v1/appointments/${appointmentID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
            authorization: `Bearer ${token}`,
        },
        body:JSON.stringify({
            date:newDate,
            time:newTime,
        }),
    });

    if (!response.ok) {
        throw new Error("Cannot update appointment"); 
    }

    return await response.json();
}