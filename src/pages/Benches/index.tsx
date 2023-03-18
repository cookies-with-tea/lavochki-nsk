import React, {useState} from 'react';
import BenchService from "@/services/Bench/BenchService";
import BenchesTable from "@/components/pages/Benches/BenchesTable";
import {useQuery} from "react-query";
import {BenchesResponseType, BenchType} from "@/types/bench.type";
import {ErrorType} from "@/types/common.type";
import {useToggle} from "@/hooks/useToggle";
import BenchesDialogUpdate from "@/components/pages/Benches/BenchesDialog/BenchesDialogUpdate";
import {Box, Button, Typography} from "@mui/material";
import BenchesDetail from "@/components/pages/Benches/BenchesDetail";
import BenchesDialogCreate from "@/components/pages/Benches/BenchesDialog/BenchesDialogCreate";
import {CommonNoData} from "@/components/Common/CommonNoData/CommonNoData";

const getBenches = async (): Promise<BenchesResponseType> => await BenchService.getAll()
const getBenchById = async (id: string): Promise<BenchType> => await BenchService.getById(id)

const TheBenches = () => {
    const [benches, setBenches] = useState<BenchesResponseType>({count: 0, items: []})
    const [bench, setBench] = useState<BenchType>()
    const [id, setId] = useState('')

    const [isUpdateDialogVisible, setIsUpdateDialogVisible] = useToggle()
    const [isCreateDialogVisible, setIsCreateDialogVisible] = useToggle()
    const [isDetailBenchVisible, setDetailBenchVisible] = useToggle()

    const benchesQuery = useQuery<BenchesResponseType, ErrorType>('get benches', getBenches, {
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
                <h1>Лавочки</h1>
                <Button color={'primary'} onClick={setIsCreateDialogVisible}>Создать лавочку</Button>
            </Box>


            {
                benches && Boolean(benches.items.length)
                     ? (
                        <BenchesTable
                            benches={benches.items}
                            updateDialogVisibleToggle={setIsUpdateDialogVisible}
                            detailBenchDrawerVisible={setDetailBenchVisible}
                            getBenchById={handleGetBenchById}
                        />
                    ) : <CommonNoData title={'Нет лавочек'} />

            }

            <BenchesDialogUpdate
                bench={bench}
                visible={isUpdateDialogVisible}
                updateTable={benchesQuery.refetch}
                onClose={setIsUpdateDialogVisible}
            />

           <BenchesDialogCreate visible={isCreateDialogVisible} onClose={setIsCreateDialogVisible} updateTable={benchesQuery.refetch} />

           <BenchesDetail
               bench={bench}
               visible={isDetailBenchVisible}
               onClose={setDetailBenchVisible}
               updateDialogVisibleToggle={setIsUpdateDialogVisible}
           />

        </Box>
    );
};

export default TheBenches