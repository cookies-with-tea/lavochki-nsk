import React, {FC} from 'react';
import styled from 'styled-components'
import LastAddItem from "@/components/home/LastAdd/LastAddItem";

const StyledLastAdd = styled.div`
    &__title {
      margin-bottom: 12px;
    }
`

const LastAdd: FC<any> = ({ benches }) => {
    return (
        <StyledLastAdd>
            <div className="last-add__title text-title">Последние добавленные</div>
            { benches?.map((bench: any) => <LastAddItem key={bench.id} bench={bench} /> ) }
        </StyledLastAdd>
    );
};

export default LastAdd;
