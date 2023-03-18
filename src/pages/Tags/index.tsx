import React, {ReactElement, useState} from 'react';
import {useQuery} from "react-query";
import {BenchTagType} from "@/types/bench.type";
import CommentsModerationTable from "@/components/pages/ReportComments/ReportCommentsTable";
import {ErrorType} from "@/types/common.type";
import TagService from "@/services/Tag/TagService";
import TagsTable from "@/components/pages/Tags/TagsTable";
import {CommonNoData} from "@/components/Common/CommonNoData/CommonNoData";

const getTags = async () => await TagService.getAll()

const TheTags = (): ReactElement => {
    const [tags, setTags] = useState<BenchTagType[]>([])

    const moderationCommentsQuery = useQuery<BenchTagType[], ErrorType>('get tags', getTags,  {
        onSuccess: (response) => {
            setTags(response)
        }
    })

    return (
        <div className={'w-100'}>
            <h1>Теги</h1>
            {
                tags && Boolean(tags.length)
                    ? (
                        <TagsTable tags={tags} />
                    ) : <CommonNoData title={'Нет тегов'} />
            }

        </div>
    );
};

export default TheTags;