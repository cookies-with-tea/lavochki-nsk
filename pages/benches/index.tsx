import axios from "axios";
import {GetStaticProps, NextPage} from "next";

import BenchesSort from "@/app/components/pages/BenchesPage/BenchesSort/BenchesSort";
import BenchesSidebar from "@/app/components/pages/BenchesPage/BenchesSidebar/BenchesSidebar";
import {StyledBenchesPage, StyledContent} from "@/app/components/pages/BenchesPage/BenchesSidebar/BenchesSidebar.styles";
import BenchCard from "@/app/components/pages/BenchesPage/BenchCard/BenchCard";

import {IBenches} from "@/app/interfaces/benches.interfaces";
import {ITag} from "@/app/interfaces/tags.interface";
import {TagType} from "@/app/types/tags.types";

const BenchesPage: NextPage<IBenches & ITag> = ({ benches, tags }): JSX.Element => {
    return (
        <StyledBenchesPage>
            <div className="flex-end mb-40">
                <h2 className="mr-40 mb-0">Все лавочки</h2>
            </div>
            <div className="d-flex">
                <BenchesSidebar tags={tags} />
                <div className={'mt-42'}>
                    <BenchesSort />
                    <StyledContent>
                        { benches && benches.map((bench: any) => ( <BenchCard key={bench.id} bench={bench} />)) }
                    </StyledContent>
                </div>
            </div>
        </StyledBenchesPage>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const benchesData = await axios.get('http://localhost:8000/api/v1/benches/')
    const tagsData = await axios.get<TagType[]>('http://localhost:8000/api/v1/tags')

    const benches = await benchesData.data
    const tags = await tagsData.data

    if (benches) {
        return {
            props: { benches, tags }
        }
    }

    return {
        notFound: true,
    }
}

export default BenchesPage;