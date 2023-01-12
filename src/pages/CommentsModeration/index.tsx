import React, {ReactElement, useState} from 'react';
import ReportService from "@/services/Report/ReportService";
import {CommentReportType, CommentType} from "@/types/comment.type";
import {useQuery} from "react-query";
import {ErrorType} from "@/types/common.type";
import CommentsModerationTable from "@/components/pages/CommentsModeration/CommentsModerationTable";

const getModerationAll = async () => await ReportService.getModerationAll()

const CommentsModeration = (): ReactElement => {
    const [comments, setComments] = useState<CommentReportType[]>([])

    const moderationCommentsQuery = useQuery<CommentReportType[], ErrorType>('get moderation comments', getModerationAll,  {
        onSuccess: (response) => {
            setComments(response)
        }
    })

    return (
        <div className={'w-100'}>
            <CommentsModerationTable comments={comments} />
        </div>
    );
};

export default CommentsModeration;