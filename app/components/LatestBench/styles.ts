import styled from "@emotion/styled";
import {Button} from "@mui/material";

export const StyledLatestBench = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--color--primary-light);
  padding: 30px 0 26px 30px;
  margin-bottom: 40px;
`

export const StyledLatestBenchInfoTitle = styled.div`
  font-weight: 500;
  font-size: 30px;
  line-height: 34px;
  color: var(--color--primary-dark);
  margin-bottom: 38px;
`

export const StyledLocationButton = styled(Button)`
  background: none;
  border: none !important;
  padding: 0 !important;
  transition: none !important;
  
  .MuiTouchRipple-root {
    display: none;
  }
  
  &:hover {
    background: none !important;
  }
`

export const StyledLatestBenchInfoLocation = styled.div`
  display: flex;
  margin-bottom: 17px;
`

export const StyledLatestBenchInfoLocationTitle = styled.div`
  font-size: 22px;
  line-height: 32px;
  font-weight: 500;
  color: var(--color--primary-dark);
  margin-right: 14px;
`

export const StyledLink = styled.a`
  width: 154px;
`