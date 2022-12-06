import React from 'react';
import axios from "axios";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {IBench} from "@/app/interfaces/benches.interfaces";

// const PostDetailed: NextPage<IBench> = (bench) => {
const PostDetailed: NextPage = () => {
    return (
        <div>
            <h1>bench 1</h1>
        </div>
    );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//     const response = await axios.get<IBench[]>('http://localhost:8000/api/v1/benches/')
//     const benches = await response.data
//
//     const paths = benches.map((bench) => ({ params: { id: bench.id } }))
//
//     return { paths, fallback: 'blocking' }
// }
//
// export const getStaticProps: GetStaticProps = async (context) => {
//     const benchId = context?.params?.id as string
//
//     const response = await axios.get<IBench>(`http://localhost:8000/api/v1/benches/${benchId}`)
//     const bench = await response.data
//
//     if (bench) {
//         return {
//             props: {
//                 bench
//             },
//             revalidate: 10
//         }
//     }
//
//     return {
//         notFound: true
//     }
// }
//
export default PostDetailed;