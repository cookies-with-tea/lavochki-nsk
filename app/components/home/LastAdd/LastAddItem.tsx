import React, {FC} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import styled from 'styled-components'

const StyledLastAddItem = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #d6d6d6;

    .last-add-item {
      &__text {
        margin-bottom: 30px;
      }
      
      &__images {
        max-width: 100%;
      }
      
      &__image {
        width: 160px;
        
        img {
          object-fit: cover;
        }
      }
    }
`
const StyledButton = styled.button`
  width: 140px;
  height: 32px;
  text-align: center;
  background-color: #ea904d;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`

const LastAddItem: FC<any> = ({ bench }) => {
    return (
        <StyledLastAddItem>
            <div className="d-flex ai-center jc-between w-100">
                <div className="info">
                    <div className="text-subtitle">
                        Лавочка { bench.id }
                    </div>
                    <div className="text-gray">
                        Где?
                    </div>
                    <div className="text last-add-item__text">
                        г.Новосибирск. Ул. Зыряновская
                    </div>
                    <StyledButton>Подробнее</StyledButton>
                </div>
                <div className="last-add-item__images">
                    <div className="last-add-item__image">
                        <img src={bench.image} alt="Bench" />
                    </div>
                    {/*<Swiper*/}
                    {/*    spaceBetween={24}*/}
                    {/*    slidesPerView={3}*/}
                    {/*>*/}
                    {/*    {new Array(5).map((item) => {*/}
                    {/*        return (*/}
                    {/*            <SwiperSlide key={item}>*/}
                    {/*                123*/}
                    {/*            </SwiperSlide>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</Swiper>*/}
                </div>
            </div>
        </StyledLastAddItem>
    );
};

export default LastAddItem;
