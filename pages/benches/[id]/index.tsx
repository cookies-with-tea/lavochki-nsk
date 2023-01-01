import React, {ReactElement, useState} from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {IBench} from "@/app/interfaces/bench.interface";
import BenchService from "@/app/services/Bench/BenchService";
import {ErrorType} from "@/app/types/common.type";
import {useRouter} from "next/router";
import Image from "next/image";
import {StyledSubtitle, StyledSubtitleAuthor, StyledTag} from '@/pages/benches/[id]/BenchDetail.styles';
import BenchDetailSlider from "@/app/components/pages/BenchDetail/BenchDetailSlider";
import BenchDetailMap from "@/app/components/pages/BenchDetail/BenchDetailMap";
import BenchDetailComments from "@/app/components/pages/BenchDetail/BenchDetailComments";
import {IComment} from "@/app/interfaces/comment.interface";
import CommentService from "@/app/services/Comment/CommentService";
import {BenchTagType} from "@/app/types/bench.type";

const getBench = async (id: string): Promise<IBench> => await BenchService.getById(id)
const getComments = async (id: string): Promise<IComment[]> => await CommentService.getById(id)

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

    const [comments, setComments] = useState<IComment[]>([{
        author_id: "", bench_id: "", content: "", nested_comments: [], parent_id: "",
        id: ''
    }
    ])

    const [chipData, setChipData] = useState<BenchTagType[] | []>([])

    const benchQuery = useQuery<IBench, ErrorType>(['get bench', benchId], getBench.bind(null, benchId), {
        onSuccess: (response: IBench) => {
            if (response) {
                setBench(response)

                setChipData(response.tags)
            }
        },
        enabled: benchId.length > 0,
        staleTime: Infinity
    })

    const commentQuery = useQuery<IComment[], ErrorType>(['get comments', benchId], getComments.bind(null, benchId), {
        onSuccess: (response) => {
            setComments(response)
        },
        enabled: benchId.length > 0,
        staleTime: Infinity
    })

    const handleUpdateData = async (): Promise<void> => {
        await benchQuery.refetch()
        await commentQuery.refetch()
    }

    return (
       <>
           <h2>Лавочка на Октябрьской</h2>
           <div className="d-f ai-c mb-30">
               <StyledSubtitle>Добавлено: 15 октября 2022</StyledSubtitle>
               <StyledSubtitle>Автор: <StyledSubtitleAuthor>Дмитрий</StyledSubtitleAuthor></StyledSubtitle>
           </div>

           <div className="d-f ai-c fw-w mb-50">
               {
                   chipData && chipData.map((chip) => ( <StyledTag key={chip.id}>{chip.title}</StyledTag> ))
               }
           </div>

           {
               bench.images && bench.images.length ? <BenchDetailSlider images={bench.images} /> : <></>
           }

           <BenchDetailMap bench={bench} />
           <BenchDetailComments benchId={bench.id} comments={comments} updateData={handleUpdateData} />
       </>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id as string
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['get bench', id], getBench.bind(null, id))
    await queryClient.prefetchQuery(['get comments', id], getComments.bind(null, id))

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