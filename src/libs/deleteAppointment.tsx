export default async function deleteAppointment(token: string, appointmentId: string) {
    const response = await fetch(`http://localhost:5003/api/v1/appointments/${appointmentId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete Appointment");
    }
  
    return await response.json();
  }