import { FC } from 'react';
import Link from 'next/link';

import LatestBench from '@/app/components/LatestBench'
import {StyledLatestBenchesLink} from "@/app/components/pages/HomePage/LatestBenches/LatestBenches.styles";

import {IBenches} from "@/app/interfaces/benches.interfaces";

const LatestBenches: FC<IBenches> = ({ benches }): JSX.Element => {
    return (
        <div className="latest-benches">
            <div className="d-flex ai-center jc-between mb-40">
                <h3>Последние добавленные</h3>
                <Link href="/benches">
                    <StyledLatestBenchesLink>Смотреть все</StyledLatestBenchesLink>
                </Link>
            </div>
            { benches && benches.map((bench: any) => <LatestBench key={bench.id} bench={bench} />) }
        </div>
    );
};

export default LatestBenches;