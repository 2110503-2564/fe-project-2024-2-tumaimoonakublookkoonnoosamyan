export default async function updateAppointment(token: string, id: string, shop: string, date: string) {
    const response = await fetch(`http://localhost:5003/api/v1/appointments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            user: id,
            massageShop: shop,
            date: date,
        }),
    });

    if (!response.ok) {
        throw new Error("Cannot update appointment"); 
    }

    return await response.json();
}