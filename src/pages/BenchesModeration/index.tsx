import React, {useEffect, useState} from 'react';
import BenchesModerationTable from "@/components/pages/BenchesModeration/BenchesModerationTable";
import BenchesModerationAcceptDialog
    from "@/components/pages/BenchesModeration/BenchesModerationReasonDialog/BenchesModerationAcceptDialog";
import BenchesModerationDenyDialog
    from "@/components/pages/BenchesModeration/BenchesModerationReasonDialog/BenchesModerationDenyDialog";
import {BenchType} from "@/types/bench.type";
import BenchService from "@/services/Bench/BenchService";
import {useQuery} from "react-query";
import {ErrorType} from "@/types/common.type";

const getModerationBenches = async () => await BenchService.getModerationAll()

const BenchesModeration = () => {
    const [isAcceptDialogOpen, setAcceptDialogOpen] = useState(false)
    const [isDenyDialogOpen, setDenyDialogOpen] = useState(false)
    const [currentReason, setCurrentReason] = useState<any>({decision: false, id: ""})
    const [benches, setBenches] = useState<BenchType[]>([])

    const moderationBenchesQuery = useQuery<BenchType[], ErrorType>('get moderation benches', getModerationBenches, {
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
            <BenchesModerationTable
                benches={benches}
                acceptDialogOpen={handleAcceptDialogReasonSet}
                denyDialogOpen={handleDenyDialogReasonSet}
            />

            <BenchesModerationAcceptDialog
                open={isAcceptDialogOpen}
                // reason={{...currentReason}}
                onClose={handleAcceptDialogVisibleToggle}
                updateTable={moderationBenchesQuery.refetch}
            />

            <BenchesModerationDenyDialog
                open={isDenyDialogOpen}
                // reason={{...currentReason}}
                onClose={handleDenyDialogVisibleToggle}
                updateTable={moderationBenchesQuery.refetch}
            />
        </div>
    );
};

export default BenchesModeration;