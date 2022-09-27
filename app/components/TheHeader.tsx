import React, { useEffect } from 'react';
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
    useEffect(() => {
      const script = document.createElement("script")
      const script2 = document.createElement("script")
    
      script.src = "https://telegram.org/js/telegram-widget.js?19";
      script.setAttribute("data-telegram-login", "bot")
      script.setAttribute("data-size", "large")
      script.setAttribute("data-onauth", "onTelegramAuth(user)")
      script.setAttribute("data-request-access", "write")
      script.async = true;
      
      const code = "function onTelegramAuth(user) {alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');}"
      script2.innerHTML = code
      
      document.body.appendChild(script);
      document.body.appendChild(script2);
    
      return () => {
        document.body.removeChild(script);
        document.body.removeChild(script2);
      }
    }, []);
    return (
        <StyledHeader>
            <div className="logo">logo</div>
            <div className="auth">
                <div className="auth__title">Хренсберг</div>
                <div className="auth__avatar">
                    <Image src={AvatarImage} alt="Image" />
                </div>
            </div>
        </StyledHeader>
        
    );
};

export default TheHeader;

