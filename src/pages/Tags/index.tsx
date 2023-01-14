import React, {ReactElement, useState} from 'react';
import {useQuery} from "react-query";
import {BenchTagType} from "@/types/bench.type";
import CommentsModerationTable from "@/components/pages/ReportComments/ReportCommentsTable";
import {ErrorType} from "@/types/common.type";
import TagService from "@/services/Tag/TagService";
import TagsTable from "@/components/pages/Tags/TagsTable";

const getTags = async () => await TagService.getAll()

const CommentsModeration = (): ReactElement => {
    const [tags, setTags] = useState<BenchTagType[]>([])

    const moderationCommentsQuery = useQuery<BenchTagType[], ErrorType>('get tags', getTags,  {
        onSuccess: (response) => {
            setTags(response)
        }
    })

    return (
        <div className={'w-100'}>
            <TagsTable tags={tags} />
        </div>
    );
};

export default CommentsModeration;