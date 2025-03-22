import getMassage from "@/libs/getMassage"
import Image from "next/image"

export default async function MassageDetailPage({params}:{params:{mid:string}}) {
    const massage = await getMassage(params.mid)


    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{massage.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={massage.data.picture} alt='Venue Img' 
                width={0} height={0} sizes="100vw" className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">
                <div className="text-md mx-5">Name: { massage.data.name}</div>
                <div className="text-md mx-5">Address: { massage.data.address}</div>
                <div className="text-md mx-5">Tel. : { massage.data.telephone}</div>
                <div className="text-md mx-5">Open-time : { massage.data.openTime} - {massage.data.closeTime}</div>
                </div>
            </div>
        </main>
    )
}
