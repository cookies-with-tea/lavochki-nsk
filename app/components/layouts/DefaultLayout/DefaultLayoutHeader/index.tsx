import React, {FC, useState} from 'react';
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import Logo from '../../../../../public/icons/logo.svg'
import Profile from '../../../../../public/Avatar.png'
import {Avatar, Button} from "@mui/material";
import TelegramIcon from '@/public/icons/telegram.svg'

const StyledHeader = styled.header`
  background-color: var(--color--accent);
`
const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 35px 0;
  justify-content: space-between;
  max-width: 1340px;
  margin-inline: auto;
`

const StyledTelegram = styled.div`
  position: relative;
  z-index: 1;
  background-color: var(--color--accent);
  border-radius: 50%;
`
const DefaultLayoutHeader: FC = (): JSX.Element => {
    const [isAuth, setIsAuth] = useState(false)

    return (
        <StyledHeader>
            <StyledHeaderWrapper>
                <Link href='/'>
                    <Image src={Logo} alt='Logo' />
                </Link>
                <div className="d-flex ai-center">
                    <Button className="mr-36">Все лавочки</Button>
                    <div className="d-flex ai-center">
                        { isAuth ? (
                            <>
                                <span>Никита</span>
                                <Avatar>
                                    <Image src={Profile} alt="Profile" />
                                </Avatar>
                            </>
                        ) : (
                            <>
                                {/*<Button>*/}
                                {/*    Войти*/}
                                {/*</Button>*/}
                                <StyledTelegram>
                                    <Image src={TelegramIcon} alt="telegram" />
                                </StyledTelegram>
                            </>
                        )}

                    </div>
                </div>
            </StyledHeaderWrapper>
        </StyledHeader>
    );
};

export default DefaultLayoutHeader;