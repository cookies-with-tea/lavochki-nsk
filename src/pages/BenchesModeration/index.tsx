import React, {useEffect, useState} from 'react';
import BenchesModerationTable from "@/components/pages/BenchesModeration/BenchesModerationTable";
import BenchesModerationAcceptDialog
    from "@/components/pages/BenchesModeration/BenchesModerationReasonDialog/BenchesModerationAcceptDialog";
import BenchesModerationDenyDialog
    from "@/components/pages/BenchesModeration/BenchesModerationReasonDialog/BenchesModerationDenyDialog";
import {BenchesResponseType} from "@/types/bench.type";
import BenchService from "@/services/Bench/BenchService";
import {useQuery} from "react-query";
import {ErrorType} from "@/types/common.type";
import {CommonNoData} from "@/components/Common/CommonNoData/CommonNoData";

const getModerationBenches = async () => await BenchService.getModerationAll()

const BenchesModeration = () => {
    const [isAcceptDialogOpen, setAcceptDialogOpen] = useState(false)
    const [isDenyDialogOpen, setDenyDialogOpen] = useState(false)
    const [currentReason, setCurrentReason] = useState<any>({decision: false, id: ""})
    const [benches, setBenches] = useState<BenchesResponseType>({count: 0, items: []})

    const moderationBenchesQuery = useQuery<BenchesResponseType, ErrorType>('get moderation benches', getModerationBenches, {
        onSuccess: (response) => {
            setBenches(response)
        }
    })

    const handleAcceptDialogVisibleToggle = (): void => {
        setAcceptDialogOpen(!isAcceptDialogOpen)
    }

    const handleDenyDialogVisibleToggle = (): void => {
        setDenyDialogOpen(!isDenyDialogOpen)
    }

    const handleAcceptDialogReasonSet = (decision: boolean, id: string): void => {
        setCurrentReason({
            decision,
            id,
        })

        handleAcceptDialogVisibleToggle()
    }

    const handleDenyDialogReasonSet = (decision: boolean, id: string): void => {
        setCurrentReason({
            decision,
            id,
        })

        handleDenyDialogVisibleToggle()
    }

    return (
        <div className={'w-100'}>
            <h1>Лавочки на модерации</h1>
            {
                benches && Boolean(benches.items.length)
                    ? (
                        <BenchesModerationTable
                            benches={benches.items}
                            acceptDialogOpen={handleAcceptDialogReasonSet}
                            denyDialogOpen={handleDenyDialogReasonSet}
                     />
                    ) : <CommonNoData title={'Нет лавочек на модерации'} />
            }

            <BenchesModerationAcceptDialog
                visible={isAcceptDialogOpen}
                // reason={{...currentReason}}
                onClose={handleAcceptDialogVisibleToggle}
                updateTable={moderationBenchesQuery.refetch}
            />

            <BenchesModerationDenyDialog
                visible={isDenyDialogOpen}
                // reason={{...currentReason}}
                onClose={handleDenyDialogVisibleToggle}
                updateTable={moderationBenchesQuery.refetch}
            />
        </div>
    );
};

export default BenchesModeration;