import React, {FC} from 'react';
import CommonIcon from "@/components/Common/CommonIcon/CommonIcon";

interface IProps {
    title: string
}

export const CommonNoData: FC<IProps> = ({ title }) => {
    return (
        <div className={'d-f ai-c jc-c fd-c'}>
            <CommonIcon name={'no-data'} width={400} height={400} className={'mb-10'} />
            <h2>{title}</h2>
        </div>
    );
};
