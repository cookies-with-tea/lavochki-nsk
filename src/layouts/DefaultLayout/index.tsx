import React, {FC, ReactElement, ReactNode} from 'react';
import CommonHeader from "@/components/layouts/DefaultLayout/DefaultLayoutHeader";
import CommonSidebar from "@/components/layouts/DefaultLayout/DefaultLayoutSidebar";
interface IProps {
    children: ReactNode
}

const DefaultLayout: FC<IProps> = ({ children }): ReactElement => {
    return (
        <>
            <CommonHeader />
            <div className={'d-f'}>
                <CommonSidebar />
                { children }
            </div>
        </>
    );
};

export default DefaultLayout;