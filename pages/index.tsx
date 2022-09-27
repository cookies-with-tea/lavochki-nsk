import type { NextPage } from 'next'
import TheHeader from "@/components/TheHeader";
import TheMap from "@/components/home/TheMap";
import LastAdd from "@/components/home/LastAdd/LastAdd";
import {useEffect, useState} from "react";
import benchesApi from "@/api/benches.api";
// import axios from "axios";
//
// export const getServerSideProps = async (): Promise<any> => {
//     const [error, data] = await benchesApi.getBenches()
//     // const { data } = await axios.get('http://localhost:8000/api/v1/benches')
//     // console.log(data)
//     // if (!data) {
//     //     return {
//     //         notFound: true
//     //     }
//     // }
//     return {
//         props: { benches: {
//             id: '1'
//             } },
//     };
// }

const Home: NextPage = () => {
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
