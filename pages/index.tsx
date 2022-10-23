import type { NextPage } from 'next'
import LatestBenches from "../app/components/home/LatestBenches";
import TheMap from "@/app/components/home/TheMap";

const Home: NextPage = (): JSX.Element => {
  return (
   <div>
       <TheMap />
       <LatestBenches />
   </div>
  )
}

export default Home
