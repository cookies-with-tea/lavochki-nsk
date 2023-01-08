import React, {useEffect, useState} from 'react';
import BenchService from "@/services/Bench/BenchService";
import BenchesTable from "@/components/pages/Benches/BenchesTable";
import {useQuery} from "react-query";
import {BenchType} from "@/types/bench.type";
import {ErrorType} from "@/types/common.type";
import {useToggle} from "@/hooks/useToggle";
import BenchesDialogUpdate from "@/components/pages/Benches/BenchesDialog/BenchesDialogUpdate";
import {Box, Button, Drawer, Typography} from "@mui/material";

const getBenches = async () => await BenchService.getAll()

const TheBenches = () => {
    const [benches, setBenches] = useState<BenchType[]>([])
    const [isUpdateDialogVisible, setIsUpdateDialogVisible] = useToggle()
    const [isDetailBenchVisible, setDetailBenchVisible] = useToggle()

    const { isFetching } = useQuery<BenchType[], ErrorType>('get benches', getBenches, {
        onSuccess: (response) => {
            setBenches(response)
        }
    })

    return (
        <Box className={'w-100'}>
            <Box className="d-f ai-c jc-sb">
                <Typography variant={'h1'} component={'h1'}>Лавочки</Typography>
                <Button color={'primary'}>Создать лавочку</Button>
            </Box>

            <BenchesTable benches={benches} updateDialogToggle={setIsUpdateDialogVisible} detailBenchDrawerVisible={setDetailBenchVisible} />

            <BenchesDialogUpdate isOpen={isUpdateDialogVisible} onClose={setIsUpdateDialogVisible} />

            <Drawer
                anchor={'right'}
                open={isDetailBenchVisible}
                onClose={setDetailBenchVisible}
            >
                Content
            </Drawer>
        </Box>
    );
};

export default TheBenches