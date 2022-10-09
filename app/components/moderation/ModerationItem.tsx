import React, {FC} from 'react';
import styled from 'styled-components'
import Image from "next/image";
import AvatarImage from "@/assets/profile-img.jpg";
import benchesApi from "@/api/benches/benches.api";

const StyledModerationItem = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #0A0A0A;
  padding-bottom: 16px;
  
  .moderation-item {
    &__image {
      width: 80px;
      height: 80px;
    }
    
    &__content {
      display: flex;
      align-items: center;
    }
    
    &__info {
      margin-right: 16px;
    }
    
    &__buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        background: #169928;
        width: 100px;
        border: none;
        cursor: pointer;
        padding: 8px 0;

        &:last-child {
          margin-left: 16px;
          background: #c10303;
        }
      }
    }

    &__username {
      font-size: 18px;
      font-weight: 600;
    }
  }
`

const setDecision = async (id: string, decision: boolean): Promise<void> => {
    const [error, data] = await benchesApi.setDecision({
        id,
        decision
    })

    console.log(error)
}

const ModerationItem: FC<any> = ({ bench }) => {
    return (
        <StyledModerationItem className="moderation-item">
            <div className="moderation-item__content">
                <div className="moderation-item__info">
                    <div className="moderation-item__username">{bench.name}</div>
                    <div>{bench.id}</div>
                </div>
                <div className="moderation-item__image">
                    <Image src={AvatarImage} alt="Image" />
                </div>
            </div>
            <div className="moderation-item__buttons">
                <button onClick={() => setDecision(bench.id, true)}>Принять</button>
                <button onClick={() => setDecision(bench.id, false)}>Отклонить</button>
            </div>
        </StyledModerationItem>
    );
};

export default ModerationItem;
