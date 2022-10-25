import React, {FC} from 'react';
import {
    StyledLatestBench,
    StyledLatestBenchInfoLocation,
    StyledLatestBenchInfoLocationTitle,
    StyledLatestBenchInfoTitle,
    StyledLink,
    StyledLocationButton
} from "@/app/components/LatestBench/styles";
import Location from '@/app/assets/icons/location.svg'
import Image from "next/image";
import Link from "next/link";
import LatestBenchSlider from "@/app/components/LatestBench/LatestBenchSlider";
import CommonIcon from "@/app/components/common/CommonIcon";

const LatestBench: FC<any> = ({ id }): JSX.Element => {
    return (
        <StyledLatestBench>
            <div className="w-50">
                <StyledLatestBenchInfoTitle>Лавочка №1</StyledLatestBenchInfoTitle>
                <StyledLatestBenchInfoLocation>
                    <StyledLatestBenchInfoLocationTitle>Г. Новосибирск, ул. Зыряновская</StyledLatestBenchInfoLocationTitle>
                    <StyledLocationButton>
                       <CommonIcon name="location" width={32} height={24} />
                    </StyledLocationButton>
                </StyledLatestBenchInfoLocation>
                <Link href='/benches/1' passHref>
                    <StyledLink>Смотреть</StyledLink>
                </Link>
            </div>
            <LatestBenchSlider className="w-50 p-relative latest-bench-slider"/>
        </StyledLatestBench>
    );
};

export default LatestBench;