import React, {FC, ReactElement, ReactNode} from 'react';
import CommonHeader from "@/components/Common/CommonHeader";
import CommonSidebar from "@/components/Common/CommonSidebar";
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