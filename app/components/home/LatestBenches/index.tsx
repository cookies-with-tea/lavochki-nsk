import Link from 'next/link';
import React, {FC} from 'react';
import LatestBench from '@/app/components/LatestBench'

const LatestBenches: FC = (): JSX.Element => {
    return (
        <div className="latest-benches">
            <div className="d-flex ai-center jc-between">
                <h3>Последние добавленные</h3>
                <Link href="/benches">Смотреть все</Link>
            </div>
            <LatestBench />
        </div>
    );
};

export default LatestBenches;