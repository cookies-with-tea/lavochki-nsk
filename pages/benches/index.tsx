import React from 'react';
import BenchesSort from "@/app/components/pages/BenchesPage/BenchesSort";
import BenchesSidebar from "@/app/components/pages/BenchesPage/BenchesSidebar";
import {StyledBenchesPage, StyledContent} from "@/app/components/pages/BenchesPage/styles";
import BenchCard from "@/app/components/pages/BenchesPage/BenchCard";
import {StyledOnTheMap} from "@/pages/benches/styles";
import Link from 'next/link';

const BenchesPage = () => {
    return (
        <StyledBenchesPage>
            <div className="flex-end mb-40">
                <h2 className="mr-40 mb-0">Все лавочки</h2>
                <Link href="#" passHref>
                    <StyledOnTheMap>
                        Показать на карте
                    </StyledOnTheMap>
                </Link>
            </div>
            <div className="d-flex">
                <BenchesSidebar />
                <div>
                    <BenchesSort />
                    <StyledContent>
                        <BenchCard />
                    </StyledContent>
                </div>

            </div>
        </StyledBenchesPage>
    );
};

export default BenchesPage;