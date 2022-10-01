import {NextPage} from "next";
import styled from 'styled-components'
import ModerationItem from "@/components/moderation/ModerationItem";

const StyledModerationPage = styled.div`
    padding: 30px;
`

const Moderation: NextPage = () => {
    return (
        <div className="container">
            <StyledModerationPage className="moderation-page">
                <ModerationItem />
            </StyledModerationPage>
        </div>
    )
}

export default Moderation
