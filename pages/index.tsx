import type { NextPage } from 'next'
import LatestBenches from "../app/components/home/LatestBenches";

const Home: NextPage = (): JSX.Element => {
  return (
   <div>
     Home
       <LatestBenches />
   </div>
  )
}

export default Home
