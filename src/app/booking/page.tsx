import LocationDateReserve from "@/components/DateReserve";
import getMassages from "@/libs/getMassages"

export default async function Home() {
  const massage = await getMassages();
  return(
    <main>
      <LocationDateReserve massageJson={massage}/>
    </main>
  );
}