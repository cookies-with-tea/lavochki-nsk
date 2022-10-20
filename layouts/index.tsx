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
            { children }
        </div>
    )
};

export default DefaultLayout;