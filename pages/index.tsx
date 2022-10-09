import type { NextPage } from 'next'
import TheHeader from "@/components/TheHeader";
import TheMap from "@/components/home/TheMap";
import LastAdd from "@/components/home/LastAdd/LastAdd";
import {useEffect, useState} from "react";
import benchesApi from "@/api/benches/benches.api";

// export const getStaticProps = async () => {
//     const [error, data] = await benchesApi.getBenches()
//     console.log(data)
//     const response = await fetch('https://jsonplaceholder.typicode.com/users')
//     const data1 = await response.json()
//
//     if (data1) {
//
//         return {
//             props: { benches: data1 }
//         }
//
//     }
//
//     return {
//         notFound: false
//     }
// }

const Home: NextPage<any> = () => {
    const [benches, setBenches] = useState<any>()

    const getBenches = async (): Promise<void> => {
        const [error, data] = await benchesApi.getBenches()

        if (!error && data) {
            setBenches(data)
        }
    }

    useEffect(() => {
       getBenches()
    }, []);

  return (
    <div className="home">
      <div className="container">
        <TheHeader />
        <TheMap benches={benches} />
        <LastAdd benches={benches} />
      </div>
    </div>
  )
}

export default Home
