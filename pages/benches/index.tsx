import React from 'react';
import BenchesSort from "@/app/components/pages/BenchesPage/BenchesSort";
import BenchesSidebar from "@/app/components/pages/BenchesPage/BenchesSidebar";
import {StyledBenchesPage, StyledContent} from "@/app/components/pages/BenchesPage/styles";
import BenchCard from "@/app/components/pages/BenchesPage/BenchCard";

const BenchesPage = () => {
    return (
        <StyledBenchesPage>
            <h2>Все лавочки</h2>
            <span>Показать на карте</span>
            <BenchesSort />
            <div className="d-flex">
                <BenchesSidebar/>
                <StyledContent>
                    <BenchCard />
                </StyledContent>
            </div>
        </StyledBenchesPage>
    );
};

export default BenchesPage;