import React, {useState} from 'react';
import {StyledSortItem, StyledSortTitle} from "@/app/components/pages/BenchesPage/BenchesSidebar/BenchesSidebar.styles";
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";
import {StyledOrderIcon} from "@/app/components/pages/BenchesPage/BenchesSort/BenchesSort.styles";

const setOrder = (currentSort: string): string => {
    switch (currentSort) {
        case 'desc': {
            return ''
        }

        case 'asc': {
            return 'desc'
        }

        default: {
            return 'asc'
        }
    }
}

const BenchesSort = (): JSX.Element => {
    const [sort, setSort] = useState([
        { id: 1, label: 'Дате добавления', value: 'date', order: '' },
        { id: 2, label: 'Рейтингу', value: 'raring', order: '' },
        { id: 3, label: 'Количеству отзывов', value: 'reviews', order: '' },
    ])

    const handleChangeSort = (sortId: number): void => {
        const newSort = sort.map((item) => {
            if (item.id === sortId) {
                const newOrder = setOrder(item.order)

                return { ...item, order: newOrder }
            }

            return { ...item, order: '' }
        })

        setSort(newSort)
    }

    return (
        <div className="d-flex ai-center mb-42">
            <StyledSortTitle>
                Сортировать по:
            </StyledSortTitle>
            <nav>
                <ul className="d-flex">
                    { sort.map((item) => (
                        <StyledSortItem
                            key={item.id}
                            onClick={() => handleChangeSort(item.id)}
                        >
                            { item.label }
                            {
                                item.order !== ''
                                && (
                                    <StyledOrderIcon name="sort-arrow" width={9} height={14} reverse={item.order === 'desc'}  />
                                )
                            }
                        </StyledSortItem>
                    )) }

                </ul>
            </nav>
        </div>
    );
};

export default BenchesSort;