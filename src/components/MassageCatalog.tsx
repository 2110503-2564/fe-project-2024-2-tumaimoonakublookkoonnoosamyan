import Card from "./Card";
import Link from "next/link";

export default async function MassageCatalog({massageJson}:{massageJson:Promise<MassageJson>}){

    const massageJsonReady = await massageJson

    return(
        <>
        <h1 className="text-center text-4xl font-extrabold">Select Your Massage</h1>
        <div className="text-center">Explore {massageJsonReady.count} Shops in our catalog</div>
        <div style={{margin:"20px", 
              display:"flex", 
              flexDirection:"row",
              flexWrap:"wrap",
              justifyContent:"space-around",
              alignContent:"space-around"}}>
                {
                  massageJsonReady.data.map((MassageItem:MassageItem) => 
                    <Link href={`/massage/${MassageItem._id.toString()}` } key={MassageItem._id} className="w-1/5">
                      <Card massageName={MassageItem.name} imgSrc={MassageItem.picture} 
                      />
                    </Link>
                  )
                }
              
        </div>
        </>
    );
}