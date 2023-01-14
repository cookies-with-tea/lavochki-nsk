import React, {ReactElement, useState} from 'react';
import ReportService from "@/services/Report/ReportService";
import {ReportCommentType, CommentType} from "@/types/comment.type";
import {useQuery} from "react-query";
import {ErrorType} from "@/types/common.type";
import ReportCommentsTable from "@/components/pages/ReportComments/ReportCommentsTable";

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
            <ReportCommentsTable comments={comments} />
        </div>
    );
};

export default ReportComments;