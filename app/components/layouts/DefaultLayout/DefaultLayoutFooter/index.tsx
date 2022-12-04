import React from 'react';
import {
    StyledAuthorLink,
    StyledAuthorsMenu,
    StyledCopyright,
    StyledFooter,
    StyledFooterWrapper,
    StyledLink,
    StyledDeveloped,
    StyledFlexEnd
} from '@/app/components/layouts/DefaultLayout/DefaultLayoutFooter/styles'
import Link from "next/link";
import {StyledHomeLink} from "@/app/components/layouts/DefaultLayout/DefaultLayoutHeader/styles";
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";

const DefaultLayoutFooter = () => {
    return (
        <>
            <StyledFooter>
                <StyledFooterWrapper className="container">
                    <div className="d-flex ai-center jc-between mb-34">
                        <Link href='/' passHref>
                            <StyledHomeLink className="default-default-footer__home">
                                <CommonIcon name="logo" width={260} height={32} fillColor="#F6EDDD" />
                            </StyledHomeLink>
                        </Link>
                        <div className="d-flex ai-center">
                            <Link href='#' passHref>
                                <a>
                                    <CommonIcon name="vk" width={48} height={48} className="mr-22"/>
                                </a>
                            </Link>
                            <Link href='#' passHref>
                                <a>
                                    <CommonIcon name="telegram-rect" width={48} height={48} />
                                </a>
                            </Link>
                        </div>
                    </div>
                     <div className="d-flex ai-center jc-between">
                         <StyledFlexEnd>
                             <span>Ознакомиться с&nbsp;</span>
                             <Link href="/pdf" passHref>
                                 <StyledLink target="_blank" rel="noreferrer">Политикой сайта</StyledLink>
                             </Link>
                         </StyledFlexEnd>
                         <StyledCopyright>
                             Copyright © 2022 Lavochki NSK
                         </StyledCopyright>
                        <nav className="d-flex p-relative">
                            <StyledDeveloped>Developed by</StyledDeveloped>
                            <StyledAuthorsMenu>
                                <ul>
                                    <Link href="#" passHref>
                                        <StyledAuthorLink target="_blank" rel="noreferrer">
                                            <span> Андрей Падерин </span>
                                        </StyledAuthorLink>
                                    </Link>
                                    <Link href="#" passHref>
                                        <StyledAuthorLink target="_blank" rel="noreferrer"> <span>Александр Никифоров</span></StyledAuthorLink>
                                    </Link>
                                    <Link href="#" passHref>
                                        <StyledAuthorLink target="_blank" rel="noreferrer"> <span>Анастасия Ищенко </span></StyledAuthorLink>
                                    </Link>
                                </ul>
                            </StyledAuthorsMenu>
                        </nav>
                    </div>
                </StyledFooterWrapper>
            </StyledFooter>
        </>

    );
};

export default DefaultLayoutFooter;