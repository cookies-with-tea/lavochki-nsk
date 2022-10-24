import React from 'react';
import {
    StyledFooter,
    StyledFooterWrapper,
    StyledLink
} from '@/app/components/layouts/DefaultLayout/DefaultLayoutFooter/styles'
import Link from "next/link";
import {StyledHomeLink} from "@/app/components/layouts/DefaultLayout/DefaultLayoutHeader/styles";
import Image from "next/image";
import Logo from "@/app/assets/icons/logo-light.svg";
import CommonIcon from "@/app/components/common/CommonIcon";

const DefaultLayoutFooter = () => {
    return (
        <>
            <StyledFooter>
                <StyledFooterWrapper className="container">
                    <div className="d-flex ai-center">
                        Ознакомиться с&nbsp;
                        <Link href="/pdf" passHref>
                            <StyledLink className="default-default-footer__police" target="_blank" rel="noreferrer">Политикой сайта</StyledLink>
                        </Link>
                    </div>
                    <Link href='/' passHref>
                        <StyledHomeLink className="default-default-footer__home">
                            <CommonIcon name="logo" width={58} height={22} fillColor="#F6EDDD" />
                        </StyledHomeLink>
                    </Link>
                </StyledFooterWrapper>
            </StyledFooter>
        </>

    );
};

export default DefaultLayoutFooter;