import React, {FC, useEffect} from 'react';
import {
    StyledLatestBench,
    StyledLatestBenchInfoLocation,
    StyledLatestBenchInfoLocationTitle,
    StyledLatestBenchInfoTitle, StyledLatestBenchSlider,
    StyledLink,
    StyledLocationButton
} from "@/app/components/LatestBench/styles";
import Location from '@/app/assets/icons/location.svg'
import Image from "next/image";
import Link from "next/link";
import LatestBenchSlider from "@/app/components/LatestBench/LatestBenchSlider";
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";

const LatestBench: FC<any> = ({ bench }): JSX.Element => {
    return (
        <StyledLatestBench>
            <div>
                <StyledLatestBenchInfoTitle>Лавочка №{bench.id}</StyledLatestBenchInfoTitle>
                <StyledLatestBenchInfoLocation>
                    <StyledLatestBenchInfoLocationTitle>Г. Новосибирск, ул. Зыряновская</StyledLatestBenchInfoLocationTitle>
                    <StyledLocationButton>
                       <CommonIcon name="location" width={24} height={32} />
                    </StyledLocationButton>
                </StyledLatestBenchInfoLocation>
                <Link href={`/benches/${bench.id}`} passHref>
                    <StyledLink>Смотреть</StyledLink>
                </Link>
            </div>
            <StyledLatestBenchSlider images={bench.images} />
        </StyledLatestBench>
    );
};

export default LatestBench;