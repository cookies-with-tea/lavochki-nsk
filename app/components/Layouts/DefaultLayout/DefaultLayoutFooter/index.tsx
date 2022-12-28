import React, {FC, ReactElement} from 'react';
import {
    StyledAuthorLink,
    StyledAuthorsMenu,
    StyledCopyright,
    StyledFooter,
    StyledFooterWrapper,
    StyledLink,
    StyledDeveloped,
} from '@/app/components/Layouts/DefaultLayout/DefaultLayoutFooter/DefaultLayoutFooter.style'
import Link from "next/link";
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";
import { BaseLink } from "@/app/styles/common";

const DefaultLayoutFooter: FC = (): ReactElement => {
    return (
        <>
            <StyledFooter>
                <StyledFooterWrapper className="container">
                    <div className="d-f ai-center jc-sb mb-34">
                        <BaseLink href='/' passHref>
                            <a className={'default-default-footer__home'}>
                                <CommonIcon name="logo" width={260} height={32} />
                            </a>
                        </BaseLink>
                        <div className="d-f ai-center">
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
                     <div className="d-f ai-center jc-sb">
                         <div className={'ai-fe'}>
                             <span>Ознакомиться с&nbsp;</span>
                             <Link href="/pdf" passHref>
                                 <StyledLink target="_blank" rel="noreferrer">Политикой сайта</StyledLink>
                             </Link>
                         </div>
                         <StyledCopyright>
                             Copyright © 2022 Lavochki NSK
                         </StyledCopyright>
                        <nav className="d-f p-relative">
                            <StyledDeveloped>Developed by</StyledDeveloped>
                            <StyledAuthorsMenu>
                                <ul>
                                    <li>
                                        <Link href="#" passHref>
                                            <StyledAuthorLink target="_blank" rel="noreferrer">
                                                <span> Андрей Падерин </span>
                                            </StyledAuthorLink>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" passHref>
                                            <StyledAuthorLink target="_blank" rel="noreferrer"> <span>Александр Никифоров</span></StyledAuthorLink>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" passHref>
                                            <StyledAuthorLink target="_blank" rel="noreferrer"> <span>Анастасия Ищенко </span></StyledAuthorLink>
                                        </Link>
                                    </li>
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