import getVenue from "@/libs/getMassage"
import Image from "next/image"

export default async function CarDetailPage({params}:{params:{vid:string}}) {
    const massage = await getVenue(params.vid)

    // const mockVenueRepo = new Map()
    // mockVenueRepo.set('001', {venueName: "The Bloom Pavilion", imgSrc: "/img/bloom.jpg"})
    // mockVenueRepo.set('002', {venueName: "Spark Space", imgSrc: "/img/sparkspace.jpg"})
    // mockVenueRepo.set('003', {venueName: "The Grand Table", imgSrc: "/img/thammasat.jpg"})

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{massage.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={massage.data.picture} alt='Venue Img' 
                width={0} height={0} sizes="100vw" className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">
                <div className="text-md mx-5">Name: { massage.data.name}</div>
                <div className="text-md mx-5">Address: { massage.data.address}</div>
                <div className="text-md mx-5">District: { massage.data.district}</div>
                <div className="text-md mx-5">Postal Code: { massage.data.postalcode}</div>
                <div className="text-md mx-5">Tel. : { massage.data.tel}</div>
                <div className="text-md mx-5">Daily Rate: { massage.data.price}</div>
                </div>
            </div>
        </main>
    )
}

// export async function generateStaticParams() {
//     return[{vid:'001'},{vid:'002'},{vid:'003'}]
// }
