import React, {ReactNode} from 'react';
import {NextPage} from "next";
import DefaultLayoutHeader from "../app/components/layouts/DefaultLayout/DefaultLayoutHeader";
import DefaultLayoutFooter from "@/app/components/layouts/DefaultLayout/DefaultLayoutFooter";

interface IProps {
    children: ReactNode
}

const DefaultLayout: NextPage<IProps> = ({ children }): JSX.Element => {
    return (
        <div>
            <DefaultLayoutHeader />
            <div className="container">
                { children }
            </div>
            <DefaultLayoutFooter />
        </div>
    )
};

export default DefaultLayout;