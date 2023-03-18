import React from 'react';
import {CommonNoData} from "@/components/Common/CommonNoData/CommonNoData";

export const CommentsPage = () => {
    return (
        <div>
            <h1>Комментарии</h1>
            <CommonNoData title={'Нет комментариев'} />
        </div>
    );
};
