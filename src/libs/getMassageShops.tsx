export default async function getMassageShops(token:string,shopName:string) {

    const response = await fetch('http://localhost:5003/api/v1/appointments' , {
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`,
        }
    })

    if(!response.ok){
        console.log(response)
        throw new Error("Failed to get massage shops")
    }

    return await response.json()
}