import getMassages from "@/libs/getMassages";
import MassageCatalog from "@/components/MassageCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";


export default function Home() {
  const massage = getMassages()
  return (
    <main>

            <Suspense fallback={<p>loading ... <LinearProgress/></p>}>
            <MassageCatalog massageJson={massage}/>
            </Suspense>
  </main>
  );
}
