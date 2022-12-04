import type { NextPage } from 'next'
import LatestBenches from "../app/components/pages/HomePage/LatestBenches";
import TheMap from "@/app/components/pages/HomePage/TheMap";
import axios from "axios";

export const getStaticProps = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/benches/')
    const benches = await response.data

    if (benches) {
        return {
            props: { benches }
        }
    }
}

const Home: NextPage<any> = ({ benches }): JSX.Element => {
  return (
   <div>
       <TheMap benches={benches} />
       <LatestBenches benches={benches} />
   </div>
  )
}

export default Home
