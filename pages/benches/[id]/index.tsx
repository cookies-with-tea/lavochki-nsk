import React, {useState} from 'react';
import axios from "axios";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {IBench} from "@/app/interfaces/benches.interfaces";
import {StyledSubtitle, StyledSubtitleAuthor, StyledTag} from "@/pages/benches/[id]/DetailedBench.styles";
import DetailedBenchMap from '@/app/components/pages/DetailedBench/DetailedBenchMap'
import DetailedBenchSlider from "@/app/components/pages/DetailedBench/DetailedBenchSlider";

// const PostDetailed: NextPage<IBench> = (bench) => {
const PostDetailed: NextPage = () => {
    const [chipData, setChipData] = useState([
        { id: 0, label: 'Магазин рядом', active: false, },
        { id: 1, label: 'Новая', active: false, },
        { id: 2, label: 'Освещённое место', active: false, },
    ])

    return (
        <div>
            <h2>Лавочка на Октябрьской</h2>
            <div className="d-flex ai-center mb-30">
                <StyledSubtitle>Добавлено: 15 октября 2022</StyledSubtitle>
                <StyledSubtitle>Автор: <StyledSubtitleAuthor>Дмитрий</StyledSubtitleAuthor></StyledSubtitle>
            </div>
            <div className="d-flex ai-center fw-w mb-50">
                {
                    chipData && chipData.map((chip) => ( <StyledTag key={chip.id}>{chip.label}</StyledTag> ))
                }
            </div>
            <DetailedBenchSlider />
            <DetailedBenchMap />
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
