import React, {ReactNode} from 'react';
import {NextPage} from "next";
import DefaultLayoutHeader from "../app/components/layouts/DefaultLayout/DefaultLayoutHeader";

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
        </div>
    )
};

export default DefaultLayout;