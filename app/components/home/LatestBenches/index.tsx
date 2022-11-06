import Link from 'next/link';
import React, {FC, useEffect, useState} from 'react';
import LatestBench from '@/app/components/LatestBench'
import styled from "@emotion/styled";
import benchesApi from "@/app/api/benches/benches.api";

const StyledLatestBenchesLink = styled.a`
  font-size: 22px;
  padding: 12px 22px;
  font-weight: 500;
  color: var(--color--background);
  background-color: var(--color--primary-dark);
`

const LatestBenches: FC<any> = ({benches}): JSX.Element => {
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