import React, {ReactElement, useState} from 'react';
import {useQuery} from "react-query";
import {BenchTagType} from "@/types/bench.type";
import CommentsModerationTable from "@/components/pages/ReportComments/ReportCommentsTable";
import {ErrorType} from "@/types/common.type";
import TagService from "@/services/Tag/TagService";
import TagsTable from "@/components/pages/Tags/TagsTable";
import {CommonNoData} from "@/components/Common/CommonNoData/CommonNoData";
import {Button} from "@mui/material";
import {useToggle} from "@/hooks/useToggle";
import {TagsDialogCreate} from "@/components/pages/Tags/TagsDialog/TagsDialogCreate/TagsDialogCreate";

const getTags = async () => await TagService.getAll()

const TheTags = (): ReactElement => {
    const [tags, setTags] = useState<BenchTagType[]>([])

    const [isCreateTagDialogVisible, setIsCreateTagDialogVisible] = useToggle()

    const tagsQuery = useQuery<BenchTagType[], ErrorType>('get tags', getTags,  {
        onSuccess: (response) => {
            setTags(response)
        }
    })

    return (
        <div className={'w-100'}>
            <div className={'d-f ai-c jc-sb'}>
                <h1>Теги</h1>
                <Button onClick={setIsCreateTagDialogVisible}>Создать тег</Button>
            </div>
            {
                tags && Boolean(tags.length)
                    ? (
                        <TagsTable tags={tags} />
                    ) : <CommonNoData title={'Нет тегов'} />
            }

            <TagsDialogCreate visible={isCreateTagDialogVisible} updateTable={tagsQuery.refetch} onClose={setIsCreateTagDialogVisible} />
        </div>
    );
};

export default TheTags;