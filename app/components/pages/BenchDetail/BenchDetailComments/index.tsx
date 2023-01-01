import React, {ChangeEvent, FC, ReactElement, useContext, useEffect, useState} from 'react';
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";
import {Box, Button, FormControl} from "@mui/material";
import {
    StyledCommentInput, StyledHeading,
    StyledOpenCommentInputButton, StyledSendCommentWrapper
} from "@/app/components/pages/BenchDetail/BenchDetailComments/BenchDetailComments.style";
import BenchDetailSendComment from "@/app/components/pages/BenchDetail/BenchDetailSendComment";
import BenchDetailComment from "@/app/components/pages/BenchDetail/BenchDetailComment";
import { UserContext } from "@/app/contexts/userContext";
import {CreateCommentType} from "@/app/types/comment.type";
import CommentService from "@/app/services/Comment/CommentService";
import {useMutation, useQuery} from "react-query";
import {ErrorType} from "@/app/types/common.type";
import {UserType} from "@/app/types/user.type";
import {IComment} from "@/app/interfaces/comment.interface";

interface IProps {
    benchId: string
    comments: IComment[]
    updateData: () => void
}

const createComment = async (payload: CreateCommentType): Promise<any> => await CommentService.create(payload)

const BenchDetailComments: FC<IProps> = ({benchId, comments, updateData}): ReactElement => {
    const { id } = useContext(UserContext)

    const [inputCommentVisible, setInputCommentVisible] = useState(false)

    const [comment, setComment] = useState<CreateCommentType>({
        bench_id: '',
        content: '',
    })

    const { mutateAsync } = useMutation(
        'create comment',
        async (payload: CreateCommentType) => createComment(payload),
        {
            onSuccess: () => {
                updateData()
            }
        }
    )

    const handleInputCommentVisibleChange = (): void => {
        setInputCommentVisible(!inputCommentVisible)
    }

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setComment({
            ...comment,
            content: event.target.value
        })
    }

    const handleCommentSend = async (): Promise<void> => {
      await mutateAsync({
          bench_id: benchId,
          content: comment.content
      })
    }

    return (
        <>
            <div className="d-f ai-c w-100 jc-sb mb-24">
                <StyledHeading>Комментарии <span>8</span> </StyledHeading>
                <div className="d-f ai-c">
                    <CommonIcon name={'sorting'} width={24} height={17} />
                    <CommonIcon name={'notifications'} width={24} height={24} />
                </div>
            </div>
            { inputCommentVisible
                ? (
                  <BenchDetailSendComment commentChange={handleCommentChange} commentSend={handleCommentSend} />
                )
                : <StyledOpenCommentInputButton
                    color={'primary'}
                    onClick={handleInputCommentVisibleChange}
                >
                    Написать комментарий...
                </StyledOpenCommentInputButton>
            }
            <div className="comments">
                {
                    comments && comments.map((comment) => <BenchDetailComment key={comment.id} benchId={benchId} comment={comment} updateData={updateData} />)
                }
            </div>
        </>
    );
};

export default BenchDetailComments;