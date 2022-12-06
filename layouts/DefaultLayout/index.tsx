import React, {ReactNode} from 'react';
import {NextPage} from "next";
import DefaultLayoutHeader from "../../app/components/layouts/DefaultLayout/DefaultLayoutHeader";
import DefaultLayoutFooter from "@/app/components/layouts/DefaultLayout/DefaultLayoutFooter";
import {StyledContainer} from "@/layouts/DefaultLayout/DefaultLayouts.styles";

interface IProps {
    children: ReactNode
}

const DefaultLayout: NextPage<IProps> = ({ children }): JSX.Element => {
    return (
        <div>
            <DefaultLayoutHeader />
            <StyledContainer className="container">
                { children }
            </StyledContainer>
            <DefaultLayoutFooter />
        </div>
    )
};

export default DefaultLayout;