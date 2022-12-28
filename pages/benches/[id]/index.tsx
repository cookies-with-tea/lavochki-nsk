import React, {ReactElement, useState} from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {IBench} from "@/app/interfaces/bench.interface";
import BenchService from "@/app/services/Bench/BenchService";
import {ErrorType} from "@/app/types/common.type";
import {useRouter} from "next/router";
import Image from "next/image";

const getBench = async (id: string): Promise<IBench> => await BenchService.getById(id)

const BenchDetail: NextPage = (): ReactElement => {
    const router = useRouter()
    const benchId = typeof router.query?.id === 'string' ? router.query.id : ''

    const [bench, setBench] = useState<IBench>({
        id: "",
        images: [],
        is_active: false,
        lat: 0,
        lng: 0,
        owner_id: "",
        tags: []
    })

    useQuery<IBench, ErrorType>(['get bench', benchId], getBench.bind(null, benchId), {
        onSuccess: (response) => {
            if (response) {
                setBench(response)
            }
        },
        enabled: benchId.length > 0,
        staleTime: Infinity
    })


    return (
        <div>
           <h1>Лавочка</h1>
            <div>{bench.id}</div>
            <div>
                <Image src={bench.images[0]} alt={'bench'} width={300} height={200} />
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id as string
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['get bench', id], getBench.bind(null, id))

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export default BenchDetail;