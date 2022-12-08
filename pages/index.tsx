import axios from "axios";
import type {GetStaticProps, NextPage} from 'next'

import LatestBenches from "@/app/components/pages/HomePage/LatestBenches";
import TheMap from "@/app/components/pages/HomePage/TheMap";

import {IBenches} from "@/app/interfaces/benches.interfaces";

export const getStaticProps: GetStaticProps = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/benches/')
    const benches = await response.data

    if (benches) {
        return {
            props: { benches }
        }
    }

    return {
        notFound: true,
    }
}

const Home: NextPage<IBenches> = ({ benches }): JSX.Element => {
  return (
   <div>
       <TheMap benches={ benches } />
       <LatestBenches benches={ benches } />
   </div>
  )
}

export default Home
