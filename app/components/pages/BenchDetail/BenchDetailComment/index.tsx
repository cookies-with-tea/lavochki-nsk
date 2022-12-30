import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import {Avatar, Button} from "@mui/material";
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";
import {
    StyledAnswerButton,
    StyledHeart, StyledHeartWrapper, StyledInfo,
    StyledText
} from "@/app/components/pages/BenchDetail/BenchDetailComment/BenchDetailComment.style";
import Image from "next/image";
import Profile from "@/public/Avatar.png";
import BenchDetailSendComment from "@/app/components/pages/BenchDetail/BenchDetailSendComment";
import {IComment} from "@/app/interfaces/comment.interface";
import {CreateCommentType} from "@/app/types/comment";
import CommentService from "@/app/services/Comment/CommentService";
import {useMutation} from "react-query";

interface IProps {
    benchId: string
    comment: IComment
    updateData: () => void
}

const createComment = async (payload: CreateCommentType): Promise<any> => await CommentService.create(payload)

const BenchDetailComment: FC<IProps> = ({benchId, comment, updateData}): ReactElement => {
    const [answer, setAnswer] = useState({
        visible: false,
        content: '',
        parentId: ''
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

    const handleAnswerVisibleToggle = (): void => {
        setAnswer({
            ...answer,
            visible: !answer.visible
        })
    }

    const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setAnswer({
            ...answer,
            content: event.target.value
        })
    }



    const handleAnswerSend = async (): Promise<void> => {
        await mutateAsync({
            bench_id: benchId,
            content: answer.content,
            parent_id: comment.id
        })
    }

    return (
        <div className={`mb-20 ${comment.parent_id ? 'ml-84' : ''}`}>
            <div className={'d-f ai-c mb-16'}>
                <Avatar sx={{ width: 64, height: 64, marginRight: '16px' }}>
                    <Image src={Profile} alt={'profile'} width={'100%'} height={'100%'} objectFit={'cover'} />
                </Avatar>
                <StyledInfo>
                    <p className="name">Аркадий</p>
                    <p className="date">10 ноября 2022, 17:50</p>
                </StyledInfo>
            </div>
            <StyledText>
                { comment.content }
            </StyledText>
            <div className="d-f ai-c jc-sb w-100 mb-16">
                <div className={'d-f ai-c'}>
                    <StyledAnswerButton className={'mr-16'} color={'primary'} onClick={handleAnswerVisibleToggle}>Ответить</StyledAnswerButton>
                    <CommonIcon name={'more'} width={24} height={24} />
                </div>
                <StyledHeartWrapper className="d-f ai-c">
                    <StyledHeart color={'primary'} disableRipple>
                        <CommonIcon name={'heart'} width={20} height={20} />
                    </StyledHeart>
                    <span>1</span>
                </StyledHeartWrapper>
            </div>

            {
                comment.nested_comments  && comment.nested_comments.map((comment) => <BenchDetailComment key={comment.id} benchId={benchId} comment={comment} updateData={updateData} />)
            }

            {
                answer.visible && <BenchDetailSendComment commentChange={handleAnswerChange} commentSend={handleAnswerSend} authorId={comment.author_id }/>
            }

        </div>
    );
};

export default BenchDetailComment;