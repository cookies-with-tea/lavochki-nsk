import React, {ReactElement, useState} from 'react';
import {StyledBenchesPage} from "@/pages/benches/BenchesPage.style";
import BenchesSidebar from '@/app/components/pages/Benches/BenchesSidebar/BenchesSidebar';
import {GetStaticProps, NextPage} from "next";
import {IBench} from "@/app/interfaces/bench.interface";
import {ITag} from "@/app/interfaces/tag.interface";
import BenchesSort from "@/app/components/pages/Benches/BenchesSort/BenchesSort";
import {StyledContent} from "@/app/components/pages/Benches/BenchesSidebar/BenchesSidebar.styles";
import BenchCard from "@/app/components/pages/Benches/Bench/BenchCard/BenchCard";
import {dehydrate, QueryClient, useQuery} from "react-query";
import BenchService from "@/app/services/Bench/BenchService";
import TagService from "@/app/services/Tag/TagService";
import {ErrorType} from "@/app/types/common.type";


const getBenches = async (): Promise<IBench[]> => await BenchService.getAll()
const getTags = async (): Promise<ITag[]> => await TagService.getAll()

const BenchesPage: NextPage = (): JSX.Element => {
    const [benches, setBenches] = useState<IBench[]>([])
    const [tags, setTags] = useState<ITag[]>([])

    useQuery<IBench[]>('get benches', getBenches, {
        onSuccess: (response) => {
            setBenches(response)
        }
    })

    useQuery<ITag[]>('get tags', getTags, {
        onSuccess: (response) => {
            setTags(response)
        }
    })

    return (
        <StyledBenchesPage>
            <div className="d-f flex-end mb-40">
                <h2 className="mr-40 mb-0">Все лавочки</h2>
            </div>
            <div className="d-f">
                <BenchesSidebar tags={tags} />

                <div className={'mt-42'}>
                    <BenchesSort />
                    <StyledContent>
                        { benches && benches.map((bench: any) => ( <BenchCard key={bench.id} bench={bench} />)) }
                    </StyledContent>
                </div>
            </div>
        </StyledBenchesPage>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery<IBench[], ErrorType>('get benches', getBenches)
    await queryClient.prefetchQuery<ITag[], ErrorType>('get tags', getTags)

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}


export default BenchesPage;