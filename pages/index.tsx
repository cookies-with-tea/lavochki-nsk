import { IBench } from "@/app/interfaces/bench.interface";
import {GetStaticProps, NextPage} from "next";
import {ReactElement} from "react";
import HomeMap from "@/app/components/pages/Home/HomeMap";
import {dehydrate, QueryClient, useQuery} from "react-query";
import BenchService from "@/app/services/Bench/BenchService";
import HomeBenches from "@/app/components/pages/Home/HomeBenches";

const getBenches = async (): Promise<IBench[]> => await BenchService.getAll()

const HomePage: NextPage = (): ReactElement => {
    const { data } = useQuery<IBench[]>('get benches', getBenches)

    return (
        <>
            <HomeMap benches={data} />
            <HomeBenches benches={ data } />
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient()

   await queryClient.prefetchQuery<IBench[]>('get benches', getBenches)

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}


export default HomePage