import React from 'react';
import BenchesSort from "@/app/components/pages/BenchesPage/BenchesSort/BenchesSort";
import BenchesSidebar from "@/app/components/pages/BenchesPage/BenchesSidebar/BenchesSidebar";
import {StyledBenchesPage, StyledContent} from "@/app/components/pages/BenchesPage/BenchesSidebar/BenchesSidebar.styles";
import BenchCard from "@/app/components/pages/BenchesPage/BenchCard/BenchCard";
import {StyledOnTheMap} from "@/pages/benches/styles";
import axios from "axios";
import {NextPage} from "next";


export const getStaticProps = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/benches/')
    const benches = await response.data

    console.log(benches)

    if (benches) {
        return {
            props: { benches }
        }
    }
}


const BenchesPage: NextPage<any> = ({ benches }): JSX.Element => {
    return (
        <StyledBenchesPage>
            <div className="flex-end mb-40">
                <h2 className="mr-40 mb-0">Все лавочки</h2>
                {/*<Link href="#" passHref>*/}
                {/*    <StyledOnTheMap>*/}
                {/*        Показать на карте*/}
                {/*    </StyledOnTheMap>*/}
                {/*</Link>*/}
            </div>
            <div className="d-flex">
                <BenchesSidebar />
                <div className={'mt-42'}>
                    <BenchesSort />
                    <StyledContent>
                        {
                            benches && benches.map((bench: any) => ( <BenchCard key={bench.id} bench={bench} />))
                        }
                    </StyledContent>
                </div>

            </div>
        </StyledBenchesPage>
    );
};

export default BenchesPage;