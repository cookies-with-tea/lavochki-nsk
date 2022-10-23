import React from 'react';
import {
    StyledFooter,
    StyledFooterWrapper,
    StyledLink
} from '@/app/components/layouts/DefaultLayout/DefaultLayoutFooter/styles'
import Link from "next/link";
import {StyledHomeLink} from "@/app/components/layouts/DefaultLayout/DefaultLayoutHeader/styles";
import Image from "next/image";
import Logo from "@/public/icons/logo-light.svg";

const DefaultLayoutFooter = () => {
    return (
        <>
            <StyledFooter>
                <StyledFooterWrapper>
                    <div className="d-flex ai-center">
                        Ознакомиться с&nbsp;
                        <Link href="/pdf" passHref>
                            <StyledLink className="default-default-footer__police" target="_blank" rel="noreferrer">Политикой сайта</StyledLink>
                        </Link>
                    </div>
                    <Link href='/' passHref>
                        <StyledHomeLink className="default-default-footer__home">
                            <Image src={Logo} alt='Logo' />
                        </StyledHomeLink>
                    </Link>
                </StyledFooterWrapper>
            </StyledFooter>
        </>

    );
};

export default DefaultLayoutFooter;