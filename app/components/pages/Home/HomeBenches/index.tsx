import React, {FC, ReactElement} from 'react';
import {IBench} from "@/app/interfaces/bench.interface";
import Link from "next/link";
import HomeBench from "@/app/components/pages/Home/HomeBench";
import {StyledAllBenchesLink} from "@/app/components/pages/Home/HomeBenches/HomeBenches.style";

const HomeBenches: FC<{ benches?: IBench[]} > = ({benches}): ReactElement => {
    return (
        <div className={'home-benches'}>
            <div className="d-f ai-center jc-sb mb-40">
                <h3>Последние добавленные</h3>
                <Link href="/benches" passHref>
                    <StyledAllBenchesLink>
                        Смотреть все
                    </StyledAllBenchesLink>
                </Link>
            </div>
            { benches && benches.map((bench: any) => <HomeBench key={bench.id} bench={bench} />) }
        </div>
    );
};

export default HomeBenches