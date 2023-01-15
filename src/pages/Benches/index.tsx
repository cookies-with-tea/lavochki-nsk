import React, {useState} from 'react';
import BenchService from "@/services/Bench/BenchService";
import BenchesTable from "@/components/pages/Benches/BenchesTable";
import {useQuery} from "react-query";
import {BenchType} from "@/types/bench.type";
import {ErrorType} from "@/types/common.type";
import {useToggle} from "@/hooks/useToggle";
import BenchesDialogUpdate from "@/components/pages/Benches/BenchesDialog/BenchesDialogUpdate";
import {Box, Button, Typography} from "@mui/material";
import BenchesDetail from "@/components/pages/Benches/BenchesDetail";

const getBenches = async (): Promise<BenchType[]> => await BenchService.getAll()
const getBenchById = async (id: string): Promise<BenchType> => await BenchService.getById(id)

const TheBenches = () => {
    const [benches, setBenches] = useState<BenchType[]>([])
    const [bench, setBench] = useState<BenchType>()
    const [id, setId] = useState('')
    const [isUpdateDialogVisible, setIsUpdateDialogVisible] = useToggle()
    const [isDetailBenchVisible, setDetailBenchVisible] = useToggle()

    useQuery<BenchType[], ErrorType>('get benches', getBenches, {
        onSuccess: (response) => {
            setBenches(response)
        }
    })

    const getBench = useQuery<BenchType, ErrorType>(
        ['get bench', id], getBenchById.bind(null, id),
        {
            onSuccess: (response) => {
                setBench(response)
            },
            enabled: false,
            staleTime: 1000,
        },
    )

    const handleGetBenchById = async (currentId: string): Promise<void> => {
        await setId(currentId)

        await getBench.refetch()
    }

    return (
        <Box className={'w-100'}>
            <Box className="d-f ai-c jc-sb">
                <Typography variant={'h1'} component={'h1'}>Лавочки</Typography>
                <Button color={'primary'}>Создать лавочку</Button>
            </Box>

            <BenchesTable
                benches={benches}
                updateDialogToggle={setIsUpdateDialogVisible}
                detailBenchDrawerVisible={setDetailBenchVisible}
                getBenchById={handleGetBenchById}
            />

            <BenchesDialogUpdate
                isOpen={isUpdateDialogVisible}
                onClose={setIsUpdateDialogVisible}
                bench={bench}
            />

           <BenchesDetail
               bench={bench}
               isOpen={isDetailBenchVisible}
               onClose={setDetailBenchVisible}
               updateDialogToggle={setIsUpdateDialogVisible}
           />
        </Box>
    );
};

export default TheBenches