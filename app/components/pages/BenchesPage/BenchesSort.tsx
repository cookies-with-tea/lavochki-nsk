import React from 'react';
import {StyledSortItem, StyledSortTitle} from "@/app/components/pages/BenchesPage/styles";

const BenchesSort = (): JSX.Element => {
    return (
        <div className="d-flex ai-center">
            <StyledSortTitle>
                Сортировать по:
            </StyledSortTitle>
            <nav>
                <ul className="d-flex">
                    <StyledSortItem>Дате добавления</StyledSortItem>
                    <StyledSortItem>Рейтингу</StyledSortItem>
                    <StyledSortItem>Количеству отзывов</StyledSortItem>
                </ul>
            </nav>
        </div>
    );
};

export default BenchesSort;