import React, {FC, useState} from 'react';
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

const setDecision = async (id: string, decision: boolean): Promise<any> => {
    const [error, data] = await benchesApi.setDecision({
        id,
        decision
    })

    if (!error && data) {
        console.log('Успешно')
    }
}

const StyledModal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0,0,0,0.3);
  
  .modal__wrapper {
    z-index: 120;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 450px;
    height: 600px;
  }
`

const handleSubmitReason = async (reason: string): Promise<void> => {
    // const [error, data] =
    console.log(reason)
}


const ModerationItem: FC<any> = ({ bench = {name: '123', id: '0'}, updateTable }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [revertReason, setRevertReason] = useState('')

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
                <button onClick={() => { setDecision(bench.id, true); updateTable()}}>Принять</button>
                <button onClick={() => { setIsModalVisible(true) }}>Отклонить</button>
            </div>
            { isModalVisible && (
                <StyledModal onClick={() => setIsModalVisible(false)}>
                    <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
                        <input placeholder={'input reason'} onChange={(e) => setRevertReason(e.target.value)} />
                        <div className="moderation-item__buttons">
                            <button onClick={() => handleSubmitReason(revertReason)}>Submit</button>
                        </div>
                    </div>
                </StyledModal>
            ) }
        </StyledModerationItem>
    );
};

export default ModerationItem;
