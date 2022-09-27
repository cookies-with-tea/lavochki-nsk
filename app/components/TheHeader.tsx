import React from 'react';
import styled from 'styled-components'
import Image from 'next/image'
import AvatarImage from '@/assets/profile-img.jpg'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  
  .logo {
    width: 40px;
    height: 40px;
  }
  
  .auth {
    display: flex;
    align-items: center;

    &__title {
      margin-right: 8px;
    }
    
    &__avatar {
      width: 50px;
      height: 50px;
      
      img {
        border-radius: 50%;
      }
    }
  }
`

const StyledLink = styled.a`
  display: block;
  margin-right: 12px;
  width: 140px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  background-color: #d58225;
  text-align: center;
  border-radius: 4px;
`

const TheHeader = (): any => {
    return (
        <StyledHeader>
            <div className="logo">logo</div>
            <div className="auth">
                <StyledLink
                    href="https://t.me/s1veme_timetable_bot?start=1"
                    target="_blank"
                >
                    Привязать аккаунт
                </StyledLink>
                <div className="auth__title">Хренсберг</div>
                <div className="auth__avatar">
                    <Image src={AvatarImage} alt="Image" />
                </div>
            </div>
        </StyledHeader>
    );
};

export default TheHeader;
