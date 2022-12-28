import styled from "@emotion/styled";
import {Button} from "@mui/material";

export const StyledBenchCard = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 20px;
  background-color: #F0E7DF;
  
  span {
    &:first-of-type {
      height: 200px !important;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
  }
`

export const StyledBenchWrapper = styled.div`
  padding: 0 38px 32px 32px;
  height: 167px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 32px;
`

export const StyledBenchTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: var(--color--primary-dark);
  margin-bottom: 34px;
`

export const StyledTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    margin-bottom: 18px;
`

export const StyledTag = styled(Button)`
  font-size: 14px;
  line-height: 16px;
  color: var(--color--primary-dark);
  padding: 0 !important;
  border: none !important;
  text-transform: capitalize;
  margin-right: 10px;
  text-align: left !important;
  display: block;
`

export const StyledOpenlink = styled.a`
  border: 1px solid var(--color--primary-dark) !important;
  border-radius: 100px;
  background-color: transparent !important;
  padding: 7px 20px !important;
  color: var(--color--primary-dark);
`

export const StyledRatingCount = styled.div`
  font-size: 16px;
  line-height: 18px;
  color: var(--color--primary-dark);
  margin-left: 4px;
`