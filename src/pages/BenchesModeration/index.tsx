import React, {useEffect, useState} from 'react';
import BenchesModerationTable from "@/components/pages/BenchesModeration/BenchesModerationTable";
import benchesApi from "@/services/Benches";
import BenchesModerationAcceptDialog
    from "@/components/pages/BenchesModeration/BenchesModerationReasonDialog/BenchesModerationAcceptDialog";
import BenchesModerationDenyDialog
    from "@/components/pages/BenchesModeration/BenchesModerationReasonDialog/BenchesModerationDenyDialog";
import {ReasonType} from "@/types/bench.type";

const BenchesModeration = () => {
    const [benches, setBenches] = useState([{}])
    const [isAcceptDialogOpen, setAcceptDialogOpen] = useState(false)
    const [isDenyDialogOpen, setDenyDialogOpen] = useState(false)
    const [currentReason, setCurrentReason] = useState<ReasonType>({decision: false, id: ""})

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

    const getBenches = async (): Promise<void> => {
        const [error, data] = await benchesApi.getModerationAll()

        if (!error && data) {
            setBenches(data)
        }
    }

    useEffect(() => {
        getBenches()
    }, [])


    return (
        <div className={'w-100'}>
            <BenchesModerationTable
                benches={benches}
                acceptDialogOpen={handleAcceptDialogReasonSet}
                denyDialogOpen={handleDenyDialogReasonSet}
            />

            <BenchesModerationAcceptDialog
                open={isAcceptDialogOpen}
                reason={{...currentReason}}
                onClose={handleAcceptDialogVisibleToggle}
                updateTable={getBenches}
            />

            <BenchesModerationDenyDialog
                open={isDenyDialogOpen}
                reason={{...currentReason}}
                onClose={handleDenyDialogVisibleToggle}
                updateTable={getBenches}
            />
        </div>
    );
};

export default BenchesModeration;