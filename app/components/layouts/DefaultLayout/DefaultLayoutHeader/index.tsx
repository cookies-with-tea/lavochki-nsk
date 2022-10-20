import React, {FC} from 'react';
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import Logo from '../../../../../public/icons/logo.svg'
import Profile from '../../../../../public/Avatar.png'
import {Avatar, Button} from "@mui/material";

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

const DefaultLayoutHeader: FC = (): JSX.Element => {
    return (
        <StyledHeader>
            <StyledHeaderWrapper>
                <Link href='/'>
                    <Image src={Logo} alt='Logo' />
                </Link>
                <div className="d-flex ai-center">
                    <Button>Все лавочки</Button>
                    <div className="d-flex ai-center">
                        <span>Никита</span>
                        <Avatar>
                            <Image src={Profile} alt="Profile" />
                        </Avatar>
                    </div>
                </div>
            </StyledHeaderWrapper>
        </StyledHeader>
    );
};

export default DefaultLayoutHeader;