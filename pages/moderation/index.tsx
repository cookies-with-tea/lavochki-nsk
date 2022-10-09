import {NextPage} from "next";
import styled from 'styled-components'
import ModerationItem from "@/components/moderation/ModerationItem";
import benchesApi from "@/api/benches/benches.api";
import {useEffect, useState} from "react";
import {parseAndGenerateServices} from "@typescript-eslint/typescript-estree";
import {data} from "dom7";

const StyledModerationPage = styled.div`
    padding: 30px;
`

const getModerationBenches = async (): Promise<any> => {
    const [error, data] =  await benchesApi.getModerationBenches()

    if (!error && data) {
        return data
    }

    return error
    // const [error, data] = await benchesApi.getBenches()
    //
    // if (!error && data) {
    //     console.log(data)
    // }
}

// export const getStaticProps = async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users')
//     const data = await response.json()
//
//     return {
//         props: { benches: data }
//     }
// }

const Moderation: NextPage<any> = () => {
    const [benches, setBenches] = useState<any>(null)

    const getModerationBenches = async (): Promise<any> => {
        const [error, data] =  await benchesApi.getModerationBenches()
        console.log(data)

        if (!error && data) {
            setBenches(data)
        } else {
            console.log(error)
        }
    }

    useEffect(() => {
        getModerationBenches()
        console.log(benches)
    }, [])
    return (
        <div className="container">
            <StyledModerationPage className="moderation-page">
                { benches && benches.map((bench: any) => ( <ModerationItem bench={bench} key={bench.id}/> )) }

            </StyledModerationPage>
        </div>
    )
}

export default Moderation
