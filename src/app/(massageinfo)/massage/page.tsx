import getMassage from "@/libs/getMassages";
import VenueCatalog from "@/components/MassageCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Home() {
  const massage = getMassage()
  return (
    <main>

            <Suspense fallback={<p>loading ... <LinearProgress/></p>}>
            <VenueCatalog massageJson={massage}/>
            </Suspense>
  </main>
  );
}
