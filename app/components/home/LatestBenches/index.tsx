import { Button } from '@mui/material';
import React, {FC} from 'react';
import LatestBench from "../../LatestBench";

const LatestBenches: FC = (): JSX.Element => {
    return (
        <div>
            <div>
                Последние добавленные
                <Button>Click on me</Button>
                <LatestBench />
            </div>
        </div>
    );
};

export default LatestBenches;