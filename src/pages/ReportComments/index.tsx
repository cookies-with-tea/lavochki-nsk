import React, {ReactElement, useState} from 'react';
import ReportService from "@/services/Report/ReportService";
import {ReportCommentType, CommentType} from "@/types/comment.type";
import {useQuery} from "react-query";
import {ErrorType} from "@/types/common.type";
import ReportCommentsTable from "@/components/pages/ReportComments/ReportCommentsTable";
import {CommonNoData} from "@/components/Common/CommonNoData/CommonNoData";

const getModerationAll = async () => await ReportService.getModerationAll()

const ReportComments = (): ReactElement => {
    const [comments, setComments] = useState<ReportCommentType[]>([])

    const moderationCommentsQuery = useQuery<ReportCommentType[], ErrorType>('get moderation comments', getModerationAll,  {
        onSuccess: (response) => {
            setComments(response)
        }
    })

    return (
        <div className={'w-100'}>
            <h1>Комментарии на модерации</h1>
            {
                comments && Boolean(comments.length)
                    ? (
                        <ReportCommentsTable comments={comments} />
                    ) : <CommonNoData title={'Нет комментариев на модерации'} />
            }
        </div>
    );
};

export default ReportComments;