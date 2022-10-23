import Link from 'next/link';
import React, {FC} from 'react';
import LatestBench from '@/app/components/LatestBench'
import styled from "@emotion/styled";

const StyledLatestBenchesLink = styled.a`
  font-size: 22px;
  padding: 12px 14px;
  font-weight: 500;
  color: var(--color--background);
  background-color: var(--color--primary-dark);
`

const LatestBenches: FC = (): JSX.Element => {
    return (
        <div className="latest-benches">
            <div className="d-flex ai-center jc-between mb-40">
                <h3>Последние добавленные</h3>
                <Link href="/benches">
                    <StyledLatestBenchesLink>Смотреть все</StyledLatestBenchesLink>
                </Link>
            </div>
            <LatestBench />
            <LatestBench />
            <LatestBench />
        </div>
    );
};

export default LatestBenches;